using DroolTool.API.Services;
using DroolTool.EFModels.Entities;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.VisualBasic.FileIO;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using static System.Int32;

namespace DroolTool.API
{
    public class
        MetricSyncJob : ScheduledBackgroundJobBase<MetricSyncJob>
    {
        public const string JobName = "Metric Sync";
        private readonly DroolToolConfiguration _droolToolConfiguration;

        public MetricSyncJob(IWebHostEnvironment webHostEnvironment, ILogger<MetricSyncJob> logger, DroolToolDbContext droolToolDbContext, IOptions<DroolToolConfiguration> droolToolConfigurationOptions) : base("Beehive Sync", logger, webHostEnvironment, droolToolDbContext)
        {
            _droolToolConfiguration = droolToolConfigurationOptions.Value;
        }

        public override List<RunEnvironment> RunEnvironments => new List<RunEnvironment> { RunEnvironment.Development, RunEnvironment.Staging, RunEnvironment.Production };
        protected override void RunJobImplementation()
        {
            var tempNeighborhoodFileName = DownloadLatestNeighborhoodFileToTempFileAndReturnTempFileName(_droolToolConfiguration.MetricsDatabaseFTPUrl, _droolToolConfiguration.MNWDFileTransferUsername, _droolToolConfiguration.MNWDFileTransferPassword);
            var tempMetricsFileName = DownloadLatestMetricFileToTempFileAndReturnTempFileName(_droolToolConfiguration.MetricsDatabaseFTPUrl, _droolToolConfiguration.MNWDFileTransferUsername, _droolToolConfiguration.MNWDFileTransferPassword);

            var metricsDataTable = LoadMetricsToDataTable(tempMetricsFileName);

            StageNeighborhoods(tempNeighborhoodFileName);
            StageData(metricsDataTable, _dbContext);

            _dbContext.Database.SetCommandTimeout(600);
            _dbContext.Database.ExecuteSqlRaw("exec dbo.pWriteStagedMetricsAndNeighborhoodsToLiveTable");
        }

        private void StageNeighborhoods(string tempFilename)
        {
            _dbContext.Database.SetCommandTimeout(600);
            _dbContext.Database.ExecuteSqlRaw("TRUNCATE TABLE DBO.NeighborhoodStaging");

            var featureCollectionFromGeoJsonFile = GeoJsonUtilities.GetFeatureCollectionFromGeoJsonFile(tempFilename, 4,
                _droolToolConfiguration.NeighborhoodSourceCoordinateSystemID);

            List<NeighborhoodStaging> neighborhoodStagings;
            try
            {
                neighborhoodStagings = featureCollectionFromGeoJsonFile.Select(x => new NeighborhoodStaging
                {
                    Watershed = x.Attributes["Watershed"].ToString(),
                    OCSurveyNeighborhoodStagingID = Parse(x.Attributes["CatchIDN"].ToString()),
                    OCSurveyDownstreamNeighborhoodStagingID = Parse(x.Attributes["DwnCatchIDN"].ToString()),
                    NeighborhoodStagingGeometry = x.Geometry,
                    NeighborhoodStagingGeometry4326 = GeoJsonUtilities.Project2230To4326(x.Geometry)
                }).ToList();
            }
            catch (ArgumentNullException e)
            {
                throw new NeighborhoodSyncException("The Neighborhood file from MNWD contained null catchment IDs", e);
            }

            var catchmentIDs = neighborhoodStagings.Select(x => x.OCSurveyNeighborhoodStagingID).ToList();
            var neighborhoodStagingsWithBrokenDownstream = neighborhoodStagings.Where(x =>
                x.OCSurveyDownstreamNeighborhoodStagingID != 0 &&
                !catchmentIDs.Contains(x.OCSurveyDownstreamNeighborhoodStagingID));

            if (neighborhoodStagingsWithBrokenDownstream.Any())
            {
                throw new NeighborhoodSyncException(
                    "The Neighborhood file from MNWD contained invalid downstream catchment IDs");
            }

            _dbContext.NeighborhoodStaging.AddRange(neighborhoodStagings);
            _dbContext.SaveChanges();
        }

        private DataTable LoadMetricsToDataTable(string pathToCsv)
        {
            var skippedRecords = 0;
            var notFloats = new List<string> { "index", "CatchIDN", "date", "Year", "Month" };
            var csvData = new DataTable();
            using var csvReader = new TextFieldParser(pathToCsv);
            csvReader.SetDelimiters(",");
            csvReader.HasFieldsEnclosedInQuotes = true;
            var colFields = csvReader.ReadFields();
            foreach (var column in colFields)
            {
                var dataColumn = new DataColumn(column) { AllowDBNull = true };
                if (!notFloats.Contains(column))
                {
                    dataColumn.DataType = typeof(float);
                }

                csvData.Columns.Add(dataColumn);
            }
            while (!csvReader.EndOfData)
            {
                var fieldData = csvReader.ReadFields();
                //Making empty value as null
                for (var i = 0; i < fieldData.Length; i++)
                {
                    if (fieldData[i] == "")
                    {
                        fieldData[i] = null;
                    }
                }

                try
                {
                    csvData.Rows.Add(fieldData.ToArray<object>());
                }
                catch (Exception)
                {
                    skippedRecords += 1;
                }
            }

            _logger.LogInformation($"Number of records skipped due to bad data: {skippedRecords}");
            return csvData;
        }

        static void StageData(DataTable csvFileData, DroolToolDbContext dbContext)
        {
            dbContext.Database.SetCommandTimeout(600);
            dbContext.Database.ExecuteSqlRaw("TRUNCATE TABLE DBO.RawDroolMetricStaging");

            using var s = new SqlBulkCopy(dbContext.Database.GetDbConnection().ConnectionString)
            {
                DestinationTableName = "RawDroolMetricStaging"
            };

            foreach (var column in csvFileData.Columns)
            {
                switch (column.ToString())
                {
                    case "index":
                        s.ColumnMappings.Add("index", "RawDroolMetricStagingID");
                        break;
                    case "CatchIDN":
                        s.ColumnMappings.Add("CatchIDN", "MetricCatchIDN");
                        break;
                    case "date":
                        s.ColumnMappings.Add("date", "MetricDate");
                        break;
                    case "Year":
                        s.ColumnMappings.Add("Year", "MetricYear");
                        break;
                    case "Month":
                        s.ColumnMappings.Add("Month", "MetricMonth");
                        break;
                    default:
                        s.ColumnMappings.Add(column.ToString(), column.ToString());
                        break;
                }

            }

            s.BulkCopyTimeout = 600;
            s.WriteToServer(csvFileData);
        }

        public static string DownloadLatestMetricFileToTempFileAndReturnTempFileName(string url, string username,
            string password)
        {
            // find the latest file in the FTP with "Metrics" in its name
            return DownloadLatestFileToTempFileAndReturnTempFileName(url, username, password, "DroolTool_Metrics");
        }

        public static string DownloadLatestNeighborhoodFileToTempFileAndReturnTempFileName(string url, string username,
            string password)
        {
            return DownloadLatestFileToTempFileAndReturnTempFileName(url, username, password, "rsb_geo");
        }

        private static string DownloadLatestFileToTempFileAndReturnTempFileName(string url, string username, string password, string filenameToSearchFor)
        {
            // Get the object used to communicate with the server.
            var directoryRequest = (FtpWebRequest)WebRequest.Create(url);
            directoryRequest.Method = WebRequestMethods.Ftp.ListDirectoryDetails;
            directoryRequest.Credentials = new NetworkCredential(username, password);
            var lines = new List<string>();
            using (var response = (FtpWebResponse)directoryRequest.GetResponse())
            {
                using var responseStream = response.GetResponseStream();
                var reader = new StreamReader(responseStream);
                while (!reader.EndOfStream)
                {
                    lines.Add(reader.ReadLine());
                }
            }

            var filenames = lines.Select(x => x.Split(new[] {' ', '\t'}).Last());

            // we're expecting filenames to be in the form {Name}_{YY}_{MM}_{DD}.{Extension},
            // so do some parsing to get the most recent file.
            // Goes without saying, but if they change their naming convention this will break.
            var latestMetricFilename = filenames.Where(x => x.Contains(filenameToSearchFor)).Select(x =>
            {
                var split = x.Split(new[] { '.', '_' });
                // Not trying to get political, but think it's a safe bet that we don't need to worry about year 2100+ for right now.
                var year = 2000 + Parse(split[2]);
                var month = Parse(split[3]);
                var day = Parse(split[4]);
                return new { Filename = x, Date = new DateTime(year, month, day) };
            }).OrderByDescending(x=>x.Date).First().Filename;

            var request = (FtpWebRequest)WebRequest.Create($"{url}{latestMetricFilename}");
            request.Method = WebRequestMethods.Ftp.DownloadFile;
            request.Credentials = new NetworkCredential(username,password);

            var tempFileName = Path.GetTempFileName();

            using (var response = (FtpWebResponse)request.GetResponse())
            using (var responseStream = response.GetResponseStream())
            using (var reader = new StreamReader(responseStream ?? throw new InvalidOperationException("The ResponseStream from the FTP request was null.")))
            using (var destination = new StreamWriter(tempFileName))
            {
                destination.Write(reader.ReadToEnd());
                destination.Flush();
            }

            return tempFileName;
        }
    }

    internal class NeighborhoodSyncException : Exception
    {
        public NeighborhoodSyncException(string message) : base(message)
        {
        }

        public NeighborhoodSyncException(string message, Exception exception): base(message, exception)
        {
            throw new NotImplementedException();
        }
    }
}
