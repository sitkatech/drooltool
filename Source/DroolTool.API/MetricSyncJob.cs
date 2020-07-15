using DroolTool.EFModels.Entities;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.VisualBasic.FileIO;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Net;
using DroolTool.API.Services;
using Microsoft.Extensions.Options;

namespace DroolTool.API
{
    public class
        MetricSyncJob : ScheduledBackgroundJobBase<MetricSyncJob>
    {
        public const string JobName = "Beehive Sync";
        private DroolToolConfiguration _droolToolConfiguration;

        public MetricSyncJob(IWebHostEnvironment webHostEnvironment, ILogger<MetricSyncJob> logger, DroolToolDbContext droolToolDbContext, IOptions<DroolToolConfiguration> droolToolConfigurationOptions) : base("Beehive Sync", logger, webHostEnvironment, droolToolDbContext)
        {
            _droolToolConfiguration = droolToolConfigurationOptions.Value;
        }

        public override List<RunEnvironment> RunEnvironments => new List<RunEnvironment> { RunEnvironment.Development, RunEnvironment.Staging, RunEnvironment.Production };
        protected override void RunJobImplementation()
        {
            // Get the object used to communicate with the server.
            FtpWebRequest request = (FtpWebRequest)WebRequest.Create(_droolToolConfiguration.MetricsDatabaseFTPUrl);
            request.Method = WebRequestMethods.Ftp.DownloadFile;

            // TODO: DO NOT PUSH TO GIT UNTIL THIS IS SCRUBBED
            request.Credentials = new NetworkCredential(_droolToolConfiguration.MNWDFileTransferUsername, _droolToolConfiguration.MNWDFileTransferPassword);

            var tempFileName = Path.GetTempFileName();

            using (FtpWebResponse response = (FtpWebResponse)request.GetResponse())
            using (Stream responseStream = response.GetResponseStream())
            using (StreamReader reader = new StreamReader(responseStream))
            using (StreamWriter destination = new StreamWriter(tempFileName))
            {
                destination.Write(reader.ReadToEnd());
                destination.Flush();
            }

            _logger.LogInformation($"Length of downloaded file: {new FileInfo(tempFileName).Length}");

            var dataTable = LoadMetricsToDataTable(tempFileName);

            _logger.LogInformation($"Length of data table: {dataTable.Rows.Count}");

            StageData(dataTable, _dbContext);

            _dbContext.Database.SetCommandTimeout(600);
            _dbContext.Database.ExecuteSqlRaw("exec dbo.pWriteStagedMetricsToLiveTable");
        }

        private static DataTable LoadMetricsToDataTable(string pathToCsv)
        {
            var skippedRecords = 0;
            var notFloats = new List<string> { "index", "CatchIDN", "date", "Year", "Month" };
            DataTable csvData = new DataTable();
            try
            {
                using (TextFieldParser csvReader = new TextFieldParser(pathToCsv))
                {
                    csvReader.SetDelimiters(new string[] { "," });
                    csvReader.HasFieldsEnclosedInQuotes = true;
                    string[] colFields = csvReader.ReadFields();
                    foreach (string column in colFields)
                    {
                        DataColumn dataColumn = new DataColumn(column);
                        dataColumn.AllowDBNull = true;
                        if (!notFloats.Contains(column))
                        {
                            dataColumn.DataType = typeof(float);
                        }

                        csvData.Columns.Add(dataColumn);
                    }
                    while (!csvReader.EndOfData)
                    {
                        string[] fieldData = csvReader.ReadFields();
                        //Making empty value as null
                        for (int i = 0; i < fieldData.Length; i++)
                        {
                            if (fieldData[i] == "")
                            {
                                fieldData[i] = null;
                            }
                        }

                        try
                        {
                            csvData.Rows.Add(fieldData);
                        }
                        catch (Exception ex)
                        {
                            skippedRecords += 1;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return null;
            }

            Console.WriteLine($"Number of records skipped due to bad data: {skippedRecords}");
            return csvData;
        }

        static void StageData(DataTable csvFileData, DroolToolDbContext dbContext)
        {
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
            s.WriteToServer(csvFileData);
        }
    }
}
