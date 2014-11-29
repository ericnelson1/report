using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Report.Api.Common
{
	public class Folder
	{
		public int Id { get; set; }
		public int ParentId { get; set; }
		public string Name { get; set; }
		public string Path { get; set; }
		public int ChildCount { get; set; }
		public string FolderUrl { get; set; }
		public string DocumentUrl { get; set; }
	}
}
