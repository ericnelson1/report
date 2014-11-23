using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Report.Api.Common;
using System.Xml;

namespace Report.Api.Controllers
{
	[RoutePrefix("api/widgets")]
	public class WidgetController : ApiController
	{
		private IWidgetRepository widgetRepo;

		public WidgetController(IWidgetRepository wr)
		{
			this.widgetRepo = wr;
		}

		[Route("", Name = "GetWidgets")]
		public IHttpActionResult GetWidgets()
		{
			IQueryable<Report.Api.Common.Widget> widgets = widgetRepo.GetAll();
			return Ok(widgets);
		}

		[Route("{id:int}", Name = "GetWidgetById")]
		public IHttpActionResult GetWidgetById(int id)
		{
			var widget = widgetRepo.Get(id);
			if (widget == null)
			{
				// Return HTTP status 404 not found.
				return NotFound();
			}
			return Ok(widget);
		}

		[Route("", Name = "PostWidget")]
		public IHttpActionResult PostWidget(Report.Api.Common.Widget widget)
		{
			widget = widgetRepo.Add(widget);
			// Successful posts should respond with 201 and include the URI of the new resource in the Location header of the response.
			return CreatedAtRoute("GetWidgetById", new { eid = widget.Id }, widget);
		}

		[Route("", Name = "PutWidget")]
		public IHttpActionResult PutWidget(int id, Report.Api.Common.Widget widget)
		{
			widget.Id = id;
			if (!widgetRepo.Update(widget))
			{
				// Return HTTP status 404 not found.
				return NotFound();
			}
			return Ok();
		}

		[Route("{id:int}", Name = "DeleteWidget")]
		public IHttpActionResult DeleteWidget(int id)
		{
			//Report.Api.Common.Widget item = widgetRepo.Get(eid);
			//if (item == null)
			//{
			//	// Return HTTP status 404 not found.
			//	return NotFound();
			//}
			widgetRepo.Remove(id);
			return Ok();
		}
	}
}
