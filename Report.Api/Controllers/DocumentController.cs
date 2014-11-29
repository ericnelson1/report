using Report.Api.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Report.Api.Controllers
{
	[RoutePrefix("api/documents")]
	public class DocumentController : ApiController
	{
		private IDocumentRepository documentRepo;

		public DocumentController(IDocumentRepository dr)
		{
			this.documentRepo = dr;
		}

		[Route("{id:int}", Name = "GetDocuments")]
		public IHttpActionResult GetDocuments(int id)
		{
			IQueryable<Document> documents = documentRepo.GetAll(id);
			return Ok(documents);
		}
	}
}
