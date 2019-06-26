using System.Collections.Generic;

namespace Blazor.IndexedDB.Framework.Connector.Models
{
    /// <summary>
    /// Defines the Database to open or create.
    /// </summary>
    public class DbStore
    {
        /// <summary>
        /// the name of the database
        /// </summary>
        public string DbName { get; set; }

        /// <summary>
        /// the version of the database. Increment the value when adding a new store.
        /// </summary>
        public double Version { get; set; }

        /// <summary>
        /// A list of store schemas used to create the database stores.
        /// </summary>
        public List<StoreSchema> Stores { get; } = new List<StoreSchema>();
    }
}
