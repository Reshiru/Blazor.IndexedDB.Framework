namespace Blazor.IndexedDB.Framework.Connector.Models
{
    /// <summary>
    /// Index definition for a store
    /// </summary>
    public class IndexSpec
    {
        public string Name { get; set; }

        public string KeyPath { get; set; }

        public bool? Unique { get; set; }

        public bool Auto { get; set; }
    }
}
