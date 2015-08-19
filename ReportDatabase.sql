use master
if exists(select * from sys.databases where name='Browser')
	drop database Browser
go
create database Browser
go
use Browser
go
-------------------------------------------------------
create table dbo.Folder (
	Id int identity(1,1) primary key,
	ParentId int,
	Name nvarchar(1024),
	[Path] nvarchar(4000)
);
go
create procedure dbo.usp_AddFolder
	@ParentId int,
	@Name nvarchar(1024), 
	@Path nvarchar(4000),
	@Id int output
as
begin
	insert dbo.Folder(ParentId, Name, [Path])
	values (@ParentId, @Name, @Path)

	set @Id = scope_identity()
end
go
create procedure dbo.usp_GetFolders
	@ParentId int
as
begin
	select Id, Name, [Path]
	from dbo.Folder
	where ParentId = @ParentId
end
go
----------------------------------------------------------------
create table dbo.Document (
	Id int identity(1,1) primary key,
	FolderId int,
	Name nvarchar(1024),
	Size int
);
go
create procedure dbo.usp_AddDocument
	@FolderId int,
	@Name nvarchar(1024), 
	@Size int,
	@Id int output
as
begin
	insert dbo.Document(FolderId, Name, Size)
	values (@FolderId, @Name, @Size)

	set @Id = scope_identity()
end
go
create procedure dbo.usp_GetDocuments
	@FolderId int
as
begin
	select Id, Name, Size
	from dbo.Document
	where FolderId = @FolderId
end
go
----------------------------------------------------------
create procedure dbo.usp_ClearDatabase
as
begin
	delete dbo.Folder
	delete dbo.Document
end
go

--select * from folder
--select * from document

