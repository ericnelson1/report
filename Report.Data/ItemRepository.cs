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
	public class ItemRepository : IItemRepository
	{
		private string connectionString = @"Server=ERIC-DESKTOP\SQLEXPRESS;DataBase=Demo;Integrated Security=SSPI";

		public ItemRepository()
		{
		}

		public IQueryable<Item> GetAll()
		{
			List<Item> systems = new List<Item>();

			using (var connection = new SqlConnection(this.connectionString))
			using (var command = new SqlCommand("usp_GetItems", connection))
			{
				command.CommandType = CommandType.StoredProcedure;
				connection.Open();
				using (SqlDataReader rdr = command.ExecuteReader())
				{
					while (rdr.Read())
					{
						systems.Add(new Item
						{
							Id = Convert.ToInt32(rdr["Id"]),
							Name = Convert.ToString(rdr["Name"])
						});
					}
				}
			}
			return systems.AsQueryable();
		}

		public Item Get(int id)
		{
			throw new NotImplementedException();
		}

		public Item Add(Item system)
		{
			using (var connection = new SqlConnection(this.connectionString))
			using (var command = new SqlCommand("usp_AddItem", connection))
			{
				command.CommandType = CommandType.StoredProcedure;
				command.Parameters.Add(new SqlParameter("@Name", system.Name));
				SqlParameter idParam = command.Parameters.Add("@Id", SqlDbType.Int);
				idParam.Direction = ParameterDirection.Output;
				connection.Open();
				command.ExecuteNonQuery();
				system.Id = (int)idParam.Value;
			}
			return system;
		}

		public void Remove(int id)
		{
			using (var connection = new SqlConnection(this.connectionString))
			using (var command = new SqlCommand("usp_DeleteItem", connection))
			{
				command.CommandType = CommandType.StoredProcedure;
				command.Parameters.Add(new SqlParameter("@Id", id));
				connection.Open();
				command.ExecuteNonQuery();
			}
		}

		public bool Update(Item item)
		{
			throw new NotImplementedException();
		}
	}
}
