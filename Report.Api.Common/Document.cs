using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Report.Api.Common
{
	public class Document
	{
		public int Id { get; set; }
		public int FolderId { get; set; }
		public string Name { get; set; }
		public int Size { get; set; }
	}
}
