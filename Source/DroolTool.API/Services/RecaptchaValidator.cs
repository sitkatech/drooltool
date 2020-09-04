using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace DroolTool.API.Services
{
    public class RecaptchaValidator
    {
        public RecaptchaValidator()
        {
        }

        public static async Task<bool> IsValidResponseAsync(string response, string secret, string verifyURL, double scoreThreshold)
        {
            var parameters = new Dictionary<string, string> { { "secret", secret }, { "response", response } };
            var encodedContent = new FormUrlEncodedContent(parameters);

            HttpClient httpClient = new HttpClient();
            var httpResponse = await httpClient.PostAsync(verifyURL, encodedContent);
            if (httpResponse.StatusCode != HttpStatusCode.OK)
            {
                return false;
            }

            var recaptchaResponse = await httpResponse.Content.ReadAsStringAsync();
            var recaptchaResponseJson = JObject.Parse(recaptchaResponse);

            switch (recaptchaResponseJson["success"].ToString().ToLower())
            {
                case "true":
                    double score;
                    var convertScore = Double.TryParse(recaptchaResponseJson["score"].ToString(), out score);
                    return convertScore && score > scoreThreshold;
                case "false":
                    return false;

                default:
                    if (recaptchaResponseJson["error-codes"] != null)
                    {
                        throw new InvalidProgramException(string.Format("Recaptcha verification failed! Error codes \"{0}\" from Recaptcha validation call.",
                            string.Join(",", recaptchaResponseJson["error-codes"])));
                    }
                    throw new InvalidProgramException(string.Format("Unknown status response \"{0}\" from Recaptcha validation call.", recaptchaResponse));
            }
        }
    }
}
