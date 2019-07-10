using Blazor.IndexedDB.Framework.Core;
using Microsoft.JSInterop;

namespace Blazor.IndexedDB.Framework.Example.Models
{
    public class ExampleDb : IndexedDb
    {
        public ExampleDb(IJSRuntime jSRuntime, string name, int version) : base(jSRuntime, name, version) { }

        public IndexedSet<Person> People { get; set; }
    }
}
