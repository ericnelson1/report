create database Demo
go
use Demo
go
create table dbo.Item (
	Id int identity(1,1) primary key,
	Name nvarchar(64)
);
go
create procedure usp_GetItems
as
begin
	select Id, Name
	from dbo.Item
end
go
create procedure usp_AddItem
	@Name nvarchar(64),
	@Id int = null output
as
begin
	insert dbo.Item(Name)
	values(@Name)

	set @Id = scope_identity();
end
go
create procedure usp_DeleteItem
	@Id int
as
begin
	delete dbo.Item
	where Id = @Id
end
go
-----------------------------------------------------
create table dbo.Widget (
	Id int identity(1,1) primary key,
	Name nvarchar(64),
	Age int,
	Color nvarchar(64)
);
go
create procedure usp_GetWidgets
as
begin
	select Id, Name, Age, Color
	from dbo.Widget
end
go
create procedure usp_AddWidget
	@Name nvarchar(64),
	@Age int,
	@Color nvarchar(64),
	@Id int = null output
as
begin
	insert dbo.Widget(Name, Age, Color)
	values(@Name, @Age, @Color)

	set @Id = scope_identity();
end
go
create procedure usp_DeleteWidget
	@Id int
as
begin
	delete dbo.Widget
	where Id = @Id
end
go
-------------------------------------------------------
exec usp_additem 'item1'
exec usp_additem 'item2'
exec usp_additem 'item3'
go
exec usp_addwidget 'widget1', '11', 'red'
exec usp_addwidget 'widget2', '22', 'blue'
exec usp_addwidget 'widget3', '33', 'green'
go
