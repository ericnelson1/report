using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Report.Api.Common
{
	public interface IItemRepository
	{
		IQueryable<Item> GetAll();
		Item Get(int id);
		Item Add(Item item);
		void Remove(int id);
		bool Update(Item item);
	}
}
