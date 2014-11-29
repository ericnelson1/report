using Report.Api.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Report.Api.Controllers
{
	[RoutePrefix("api/folders")]
	public class FolderController : ApiController
	{
		private IFolderRepository folderRepo;

		public FolderController(IFolderRepository fr)
		{
			this.folderRepo = fr;
		}

		[Route("{id:int}", Name = "GetFolders")]
		public IHttpActionResult GetFolders(int id)
		{
			IQueryable<Folder> folders = (folderRepo.GetAll(id) as IEnumerable<Folder>).Select(folder =>
			{
				if (folder.ChildCount > 0)
				{
					folder.FolderUrl = Url.Link("GetFolders", new { id = folder.Id });
				}
				folder.DocumentUrl = Url.Link("GetDocuments", new { id = folder.Id });
				return folder;
			}).AsQueryable();


			return Ok(folders);
		}
	}
}
