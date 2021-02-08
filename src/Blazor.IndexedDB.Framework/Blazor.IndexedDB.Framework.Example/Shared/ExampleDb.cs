using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Blazor.IndexedDB.Framework;
using Microsoft.JSInterop;

namespace BlazorIndexedDBTestProject.Shared
{
    public class ExampleDb:IndexedDb
    {
        public ExampleDb(IJSRuntime jSRuntime, string name, int version) : base(jSRuntime, name, version)
        {
        }
        public IndexedSet<Person> People { get; set; }
    }
    public class Person
    {
        [Key]
        public long Id { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }
    }
}
