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
	public class FolderRepository: IFolderRepository
	{
		public string connectionString = @"Server=ERIC-DESKTOP\SQLEXPRESS;DataBase=Demo;Integrated Security=SSPI";

		public IQueryable<Folder> GetAll(int id)
		{
			List<Folder> folders = new List<Folder>();

			using (var connection = new SqlConnection(this.connectionString))
			using (var command = new SqlCommand("usp_GetFolders", connection))
			{
				command.CommandType = CommandType.StoredProcedure;
				command.Parameters.Add(new SqlParameter("@ParentId", id));
				connection.Open();
				using (SqlDataReader rdr = command.ExecuteReader())
				{
					while (rdr.Read())
					{
						folders.Add(new Folder
						{
							Id = Convert.ToInt32(rdr["Id"]),
							Name = Convert.ToString(rdr["Name"]),
							Path = Convert.ToString(rdr["Path"]),
							ChildCount = 1 // todo
						});
					}
				}
			}
			return folders.AsQueryable();
		}
	}
}
