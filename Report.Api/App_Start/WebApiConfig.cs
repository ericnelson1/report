using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Report.Api
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

			// Enabling CORS allows our API to be called from other origins (protocol/host/port)
			// In our case, origin is the location of the web client
			// http://www.asp.net/web-api/overview/security/enabling-cross-origin-requests-in-web-api

			var cors = new EnableCorsAttribute("http://localhost:63000", "*", "*");
			config.EnableCors(cors);

			config.Formatters.JsonFormatter.SerializerSettings.Formatting = Formatting.Indented;
			config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
