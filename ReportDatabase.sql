create table Environment (
	Id int identity(1,1) primary key,
	Name nvarchar(64)
);
go

create procedure usp_GetEnvironments
as
begin
	select Id, Name
	from dbo.Environment
end
go
alter procedure usp_AddEnvironment
	@Name nvarchar(64),
	@Id int = null output
as
begin
	insert dbo.Environment(Name)
	values(@Name)

	set @Id = scope_identity();
end
go
create procedure usp_DeleteEnvironment
	@Id int
as
begin
	delete dbo.Environment
	where Id = @Id
end
go

