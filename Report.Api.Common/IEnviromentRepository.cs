using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Report.Api.Common
{
	public interface IEnvironmentRepository
	{
		IQueryable<Environment> GetAll();
		Environment Get(int id);
		Environment Add(Environment item);
		void Remove(int id);
		bool Update(Environment item);
	}
}
