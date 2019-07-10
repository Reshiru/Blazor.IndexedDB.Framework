using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Blazor.IndexedDB.Framework.Example.Models
{
    public class Person
    {
        [Key]
        public long Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        [ForeignKey(nameof(DogId))]
        [Browsable(false)]
        public Dog Dog { get; set; } = new Dog()
        {
            Id = 10
        };

        public long DogId { get; set; }
    }

    public class Dog
    {
        public long Id { get; set; }
    }
}
