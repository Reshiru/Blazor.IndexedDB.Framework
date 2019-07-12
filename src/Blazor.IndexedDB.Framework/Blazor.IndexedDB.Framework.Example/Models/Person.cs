using System.Collections.Generic;

namespace Blazor.IndexedDB.Framework.Example.Models
{
    public class Person
    {
        public long Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        // Idk just 1:1
        public Token Token { get; set; }

        // 1:n
        public Address Address { get; set; }

        // n:m
        public ICollection<Dog> Dog { get; set; }

        // n:n self
        public ICollection<Person> Family { get; set; }
    }
}
