﻿namespace DroolTool.API.Services
{
    public class DroolToolConfiguration
    {
        public string KEYSTONE_HOST { get; set; }
        public string DB_CONNECTION_STRING { get; set; }
        public string SITKA_EMAIL_REDIRECT { get; set; }
        public string DROOLTOOL_WEB_URL { get; set; }
        public string KEYSTONE_REDIRECT_URL { get; set; }

        public string RECAPTCHA_SECRET_KEY { get; set; }
        public string RECAPTCHA_VERIFY_URL { get; set; }
        public double RECAPTCHA_SCORE_THRESHOLD { get; set; }
        public string HostName { get; set; }
        public string SendGridApiKey { get; set; }
    }
}
