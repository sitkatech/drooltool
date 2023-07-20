using NetTopologySuite.Features;
using NetTopologySuite.Geometries;
using NetTopologySuite.IO;
using Newtonsoft.Json;
using System;
using System.IO;
using System.Linq;
using DotSpatial.Projections;

namespace DroolTool.API.Services
{
    public static class GeoJsonUtilities
    {
        private const int WEB_MERCATOR_SRID = 4326;

        public static ProjectionInfo WebMercator => KnownCoordinateSystems.Geographic.World.WGS1984;

        public static ProjectionInfo CaStatePlane2230 => KnownCoordinateSystems.Projected.StatePlaneNad1983Feet
            .NAD1983StatePlaneCaliforniaVIFIPS0406Feet;

        public static FeatureCollection GetFeatureCollectionFromGeoJsonFile(string pathToGeoJsonFile,
            int coordinatePrecision, int sourceCoordinateSystemID)
        {
            FeatureCollection featureCollection;
            using (var streamReader = new StreamReader(File.OpenRead(pathToGeoJsonFile)))
            using (var jsonReader = new JsonTextReader(streamReader))
            {

                var scale = Math.Pow(10, coordinatePrecision);
                var geometryFactory = new GeometryFactory(new PrecisionModel(scale),
                    sourceCoordinateSystemID);
                var reader = new GeoJsonReader(geometryFactory, new JsonSerializerSettings());
                featureCollection = reader.Read<FeatureCollection>(jsonReader);
            }

            return featureCollection;
        }

        public static Geometry Project2230To4326(Geometry inputGeometry)
        {
            var output = inputGeometry.Copy();

            double[] pointArray = new double[output.Coordinates.Count() * 2];
            double[] zArray = new double[1];
            zArray[0] = 1;

            // read coordinates into pointArray
            int counterX = 0;
            int counterY = 1;
            foreach (var coordinate in output.Coordinates)
            {
                pointArray[counterX] = coordinate.X;
                pointArray[counterY] = coordinate.Y;

                counterX = counterX + 2;
                counterY = counterY + 2;
            }

            Reproject.ReprojectPoints(pointArray, zArray, CaStatePlane2230, WebMercator, 0, (pointArray.Length / 2));

            // read reprojected coordinates back to output geometry
            counterX = 0;
            counterY = 1;
            foreach (var coordinate in output.Coordinates)
            {
                coordinate.X = pointArray[counterX];
                coordinate.Y = pointArray[counterY];

                counterX = counterX + 2;
                counterY = counterY + 2;
            }

            output.SRID = WEB_MERCATOR_SRID;

            return output;
        }

    }
}
