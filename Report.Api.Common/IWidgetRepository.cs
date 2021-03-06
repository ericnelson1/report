﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Report.Api.Common
{
	public interface IWidgetRepository
	{
		IQueryable<Widget> GetAll();
		Widget Get(int id);
		Widget Add(Widget item);
		void Remove(int id);
		bool Update(Widget item);
	}
}
