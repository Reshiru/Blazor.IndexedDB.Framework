using Blazor.IndexedDB.Framework;
using Microsoft.JSInterop;

namespace Blazor.IndexedDB.Framework.Example.Models
{
    public class ExampleDb : IndexedDb
    {
        public ExampleDb(IJSRuntime jSRuntime, string name, int version) : base(jSRuntime, name, version) { }

        public IndexedSet<Person> People { get; set; }

        public IndexedSet<Token> Tokens { get; set; }

        public IndexedSet<Address> Addresses { get; set; }

        public IndexedSet<Dog> Dogs { get; set; }
    }
}
