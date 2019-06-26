using System.Collections.Generic;

namespace Blazor.IndexedDB.Framework.Connector.Models
{
    /// <summary>
    /// Defines a store to be created in the database.
    /// </summary>
    public class StoreSchema
    {
        public double? DbVersion { get; set; }

        public string Name { get; set; }

        public IndexSpec PrimaryKey { get; set; }

        public List<IndexSpec> Indexes { get; set; }
    }
}
