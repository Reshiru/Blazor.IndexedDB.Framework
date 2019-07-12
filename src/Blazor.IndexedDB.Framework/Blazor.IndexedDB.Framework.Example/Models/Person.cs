using Blazor.IndexedDB.Framework.Attributes;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Blazor.IndexedDB.Framework.Example.Models
{
    public class Person
    {
        // If key = "Id" then attribute not necessary
        [Key]
        public long Id { get; set; }

        public long Increment { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        [Unique]
        public string Username { get; set; }

        [Serialize]
        public SomeObject SomeObject { get; set; }

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
