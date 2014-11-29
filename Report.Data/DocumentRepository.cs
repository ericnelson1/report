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
	public class DocumentRepository : IDocumentRepository
	{
		public string connectionString = @"Server=ERIC-DESKTOP\SQLEXPRESS;DataBase=Demo;Integrated Security=SSPI";

		public IQueryable<Document> GetAll(int id)
		{
			List<Document> docs = new List<Document>();

			using (var connection = new SqlConnection(this.connectionString))
			using (var command = new SqlCommand("usp_GetDocuments", connection))
			{
				command.CommandType = CommandType.StoredProcedure;
				command.Parameters.Add(new SqlParameter("@FolderId", id));
				connection.Open();
				using (SqlDataReader rdr = command.ExecuteReader())
				{
					while (rdr.Read())
					{
						docs.Add(new Document
						{
							Id = Convert.ToInt32(rdr["Id"]),
							Name = Convert.ToString(rdr["Name"]),
							Size = Convert.ToInt32(rdr["Size"])
						});
					}
				}
			}
			return docs.AsQueryable();
		}

	}
}
