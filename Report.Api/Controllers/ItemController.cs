using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Report.Api.Common;
using System.Xml;

namespace Report.Api.Controllers
{
	[RoutePrefix("api/items")]
	public class ItemController : ApiController
    {
		private IItemRepository itemRepo;

		public ItemController(IItemRepository er)
		{
			this.itemRepo = er;
		}

		[Route("", Name="GetItems")]
		public IHttpActionResult GetItems()
		{
			IQueryable<Item> items = itemRepo.GetAll();
			return Ok(items);
		}

		[Route("{eid:int}", Name="GetItemById")]
		public IHttpActionResult GetItemById(int eid)
		{
			var item = itemRepo.Get(eid);
			if (item == null)
			{
				// Return HTTP status 404 not found.
				return NotFound();
			}
			return Ok(item);
		}

		[Route("", Name="PostItem")]
		public IHttpActionResult PostItem(Item item)
		{
			item = itemRepo.Add(item);
			// Successful posts should respond with 201 and include the URI of the new resource in the Location header of the response.
			return CreatedAtRoute("GetItemById", new { eid = item.Id }, item);
		}

		[Route("", Name="PutItem")]
		public IHttpActionResult PutItem(int id, Item item)
		{
			item.Id = id;
			if (!itemRepo.Update(item))
			{
				// Return HTTP status 404 not found.
				return NotFound();
			}
			return Ok();
		}

		[Route("{id:int}", Name="DeleteItem")]
		public IHttpActionResult DeleteItem(int id)
		{
			//Item item = itemRepo.Get(eid);
			//if (item == null)
			//{
			//	// Return HTTP status 404 not found.
			//	return NotFound();
			//}
			itemRepo.Remove(id);
			return Ok();
		}
    }
}
