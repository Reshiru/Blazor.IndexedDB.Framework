using System.Collections.Generic;

namespace Blazor.IndexedDB.Framework.Example.Models
{
    public class Address
    {
        public long Id { get; set; }

        public string Place { get; set; }

        public string Street { get; set; }

        public string HouseNumber { get; set; }

        public ICollection<Person> Residents { get; set; }
    }
}
