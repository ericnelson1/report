using Report.Api.Common;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Report.Data
{
	public class EnvironmentRepository : IEnvironmentRepository
	{
		private List<Report.Api.Common.Environment> environments = new List<Report.Api.Common.Environment>() 
		{
			new Report.Api.Common.Environment { Name = "Eden Prairie" },
			new Report.Api.Common.Environment { Name = "London" },
			new Report.Api.Common.Environment { Name = "Tokyo" },
			new Report.Api.Common.Environment { Name = "Paris" },
			new Report.Api.Common.Environment { Name = "Moscow" },
			new Report.Api.Common.Environment { Name = "Rome" },
			new Report.Api.Common.Environment { Name = "Berlin" },
			new Report.Api.Common.Environment { Name = "Budapest" },
			new Report.Api.Common.Environment { Name = "Madrid" }
		};

		private string connectionString = @"Server=ERIC-DESKTOP\SQLEXPRESS;DataBase=Report;Integrated Security=SSPI";

		public EnvironmentRepository()
        {
        }

		public IQueryable<Api.Common.Environment> GetAll()
		{
			List<Report.Api.Common.Environment> environments = new List<Report.Api.Common.Environment>();

			using (SqlConnection conn = new SqlConnection(this.connectionString))
			{
				try {
					conn.Open();
				}
				catch(Exception ex)
				{

				}
				SqlCommand cmd = new SqlCommand("usp_GetEnvironments", conn);
				cmd.CommandType = CommandType.StoredProcedure;
				using (SqlDataReader rdr = cmd.ExecuteReader())
				{
					while (rdr.Read())
					{
						environments.Add(new Report.Api.Common.Environment { 
							Id = Convert.ToInt32(rdr["Id"]), 
							Name = Convert.ToString(rdr["Name"]) 
						});
					}
				}
			}
			return environments.AsQueryable();
		}

		public Api.Common.Environment Get(int id)
		{
			throw new NotImplementedException();
		}

		public Api.Common.Environment Add(Api.Common.Environment environment)
		{
			using (var connection = new SqlConnection(this.connectionString))
			using (var command = new SqlCommand("usp_AddEnvironment", connection))
			{
				command.CommandType = CommandType.StoredProcedure;
				command.Parameters.Add(new SqlParameter("@Name", environment.Name));
				SqlParameter idParam = command.Parameters.Add("@Id", SqlDbType.Int);
				idParam.Direction = ParameterDirection.Output;
				connection.Open();
				command.ExecuteNonQuery();
				environment.Id = (int)idParam.Value;
			}
			return environment;
		}

		public void Remove(int id)
		{
			using (var connection = new SqlConnection(this.connectionString))
			using (var command = new SqlCommand("usp_DeleteEnvironment", connection))
			{
				command.CommandType = CommandType.StoredProcedure;
				command.Parameters.Add(new SqlParameter("@Id", id));
				connection.Open();
				command.ExecuteNonQuery();
			}
		}

		public bool Update(Api.Common.Environment item)
		{
			throw new NotImplementedException();
		}
	}
}
