using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Report.Api.Common;
using System.Xml;

namespace Report.Api.Controllers
{
	[RoutePrefix("api/environments")]
	public class EnvironmentController : ApiController
    {
		private IEnvironmentRepository environmentRepo;

		public EnvironmentController(IEnvironmentRepository er)
		{
			this.environmentRepo = er;
		}

		[Route("", Name="GetEnvironments")]
		public IHttpActionResult GetEnvironments()
		{
			IQueryable<Report.Api.Common.Environment> environments = environmentRepo.GetAll();
			return Ok(environments);
		}

		[Route("{eid:int}", Name="GetEnvironmentById")]
		public IHttpActionResult GetEnvironmentById(int eid)
		{
			var environment = environmentRepo.Get(eid);
			if (environment == null)
			{
				// Return HTTP status 404 not found.
				return NotFound();
			}
			return Ok(environment);
		}

		[Route("", Name="PostEnvironment")]
		public IHttpActionResult PostEnvironment(Report.Api.Common.Environment environment)
		{
			environment = environmentRepo.Add(environment);
			// Successful posts should respond with 201 and include the URI of the new resource in the Location header of the response.
			return CreatedAtRoute("GetEnvironmentById", new { eid = environment.Id }, environment);
		}

		[Route("", Name="PutEnvironment")]
		public IHttpActionResult PutEnvironment(int id, Report.Api.Common.Environment environment)
		{
			environment.Id = id;
			if (!environmentRepo.Update(environment))
			{
				// Return HTTP status 404 not found.
				return NotFound();
			}
			return Ok();
		}

		[Route("{id:int}", Name="DeleteEnvironment")]
		public IHttpActionResult DeleteEnvironment(int id)
		{
			//Report.Api.Common.Environment item = environmentRepo.Get(eid);
			//if (item == null)
			//{
			//	// Return HTTP status 404 not found.
			//	return NotFound();
			//}
			environmentRepo.Remove(id);
			return Ok();
		}
    }
}
