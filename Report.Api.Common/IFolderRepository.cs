﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Report.Api.Common
{
	public interface IFolderRepository
	{
		IQueryable<Folder> GetAll(int id);

	}
}