using Report.Api.Common;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Catalog
{
	class Program
	{
		static void Main(string[] args)
		{
			Console.WriteLine("Number of command line parameters = {0}", args.Length);
			for (int i = 0; i < args.Length; i++)
			{
				Console.WriteLine("Arg[{0}] = [{1}]", i, args[i]);
			}

			Console.WriteLine("Start");
			Console.ReadKey();
//			if (Directory.Exists(path)) 
			Folder folder = new Folder { Name = "Documents", Path = @"C:\Users\Eric\Documents", ParentId = 0 };
			ProcessDirectory(folder);
			Console.WriteLine("Done");
			Console.ReadKey();
		}

		public static void ProcessDirectory(Folder parent)
		{
			try
			{
				AddFolder(parent);

				string[] fileEntries = Directory.GetFiles(parent.Path);
				foreach (string fileName in fileEntries)
				{
					string name = fileName.Split(Path.DirectorySeparatorChar).Last();
					Document doc = new Document { Name = name, Size = 50, FolderId = parent.Id};
					AddDocument(doc);
				}

				string[] subdirectoryEntries = Directory.GetDirectories(parent.Path);
				foreach (string subdirectory in subdirectoryEntries)
				{
					string name = subdirectory.Split(Path.DirectorySeparatorChar).Last();
					Folder folder = new Folder { Name = name, Path = subdirectory, ParentId = parent.Id };
					ProcessDirectory(folder);
				}
			}
			catch(Exception)
			{

			}
		}

		public static string connectionString = @"Server=ERIC-DESKTOP\SQLEXPRESS;DataBase=Demo;Integrated Security=SSPI";

		public static void AddFolder(Folder folder)
		{
			using (var connection = new SqlConnection(connectionString))
			using (var command = new SqlCommand("usp_AddFolder", connection))
			{
				command.CommandType = CommandType.StoredProcedure;
				command.Parameters.Add(new SqlParameter("@ParentId", folder.ParentId));
				command.Parameters.Add(new SqlParameter("@Name", folder.Name));
				command.Parameters.Add(new SqlParameter("@Path", folder.Path));
				SqlParameter idParam = command.Parameters.Add("@Id", SqlDbType.Int);
				idParam.Direction = ParameterDirection.Output;
				connection.Open();
				command.ExecuteNonQuery();
				folder.Id = (int)idParam.Value;
			}
		}

		public static void AddDocument(Document doc)
		{
			using (var connection = new SqlConnection(connectionString))
			using (var command = new SqlCommand("usp_AddDocument", connection))
			{
				command.CommandType = CommandType.StoredProcedure;
				command.Parameters.Add(new SqlParameter("@FolderId", doc.FolderId));
				command.Parameters.Add(new SqlParameter("@Name", doc.Name));
				command.Parameters.Add(new SqlParameter("@Size", doc.Size));
				SqlParameter idParam = command.Parameters.Add("@Id", SqlDbType.Int);
				idParam.Direction = ParameterDirection.Output;
				connection.Open();
				command.ExecuteNonQuery();
				doc.Id = (int)idParam.Value;
			}
		}

	}
}
