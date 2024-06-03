using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Serilog;

namespace DroolTool.Web
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args)
        {
            var hostBuilder = Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder => { webBuilder.UseStartup<Startup>(); })
                .ConfigureLogging(logging => { logging.ClearProviders(); })
                .UseSerilog((context, services, configuration) =>
                {
                    configuration
                        .Enrich.FromLogContext()
                        .ReadFrom.Configuration(context.Configuration);
                });
            return hostBuilder;
        }
    }
}
