[![NuGet Status](http://img.shields.io/nuget/v/Reshiru.Blazor.IndexedDB.Framework.svg?style=flat&max-age=86400)](https://www.nuget.org/packages/Reshiru.Blazor.IndexedDB.Framework/)

# <img src="https://github.com/Reshiru/Blazor.IndexedDB.Framework/blob/master/logo.svg" height="28px"> Blazor.IndexedDB.Framework

An easy way to interact with IndexedDB and make it feel like EFCore but async.

# NuGet installation
```powershell
PM> Install-Package Reshiru.Blazor.IndexedDB.Framework
```

## Current features
0. Connect and create database
1. Add record
2. Remove record
3. Edit record

## Planned features or optimizations
1. FK implementation
2. Optimize change tracker (currently using snapshotting mechanism based using hashes)
3. Remove PK dependencies from IndexedSet
4. Versioning (eg. merging database)?

## How to use
1. In your startup.cs file add
```CSharp
services.AddSingleton<IIndexedDbFactory, IndexedDbFactory>();
```
IIndexedDbFactory is used to create your database connection and will create the database instance for you.
IndexedDbFactory requires an instance IJSRuntime, should normally already be registered.

2. Create any code first database model you'd like to create and inherit from IndexedDb. (Only properties with the type IndexedSet<> will be used, any other properties are beeing ignored)
```CSharp
public class ExampleDb : IndexedDb
{
  public ExampleDb(IJSRuntime jSRuntime, string name, int version) : base(jSRuntime, name, version) { }
  public IndexedSet<Person> People { get; set; }
}
```
- Your model (eg. person) should contain an Id property or a property marked with the key attribute.
```CSharp
[System.ComponentModel.DataAnnotations.Key]
```

* Example
```CSharp
public class Person
{
  [Key]
  public long Id { get; set; }
  public string FirstName { get; set; }
  public string LastName { get; set; }
}
```

3. Now you can start using your database.
(Usage in razor via inject: @inject IIndexedDbFactory DbFactory)

### Adding records
```CSharp
using (var db = await this.DbFactory.Create<ExampleDb>())
{
  db.People.Add(new Person()
  {
    FirstName = "First",
    LastName = "Last"
  });
  await db.SaveChanges();
}
```
### Removing records
Note: To remove an element it is faster to use a already created reference. You should be able to also remove an object only by it's id but you have to use the .Remove(object) method (eg. .Remove(new object() { Id = 1 }))
```CSharp
using (var db = await this.DbFactory.Create<ExampleDb>())
{
  var firstPerson = db.People.First();
  db.People.Remove(firstPerson);
  await db.SaveChanges();
}
```
### Modifying records
```CSharp
using (var db = await this.DbFactory.Create<ExampleDb>())
{
  var personWithId1 = db.People.Single(x => x.Id == 1);
  personWithId1.FirstName = "This is 100% a first name";
  await db.SaveChanges();
}
```

## License

Copyright (c) Joel Kessler. All rights reserved.

Licensed under the [MIT](LICENSE) license.
