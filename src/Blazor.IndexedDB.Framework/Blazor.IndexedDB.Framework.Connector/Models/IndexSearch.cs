namespace Blazor.IndexedDB.Framework.Connector.Models
{
    /// <summary>
    /// This used when querying a store using a predefined index
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class IndexSearch<T>
    {
        public string Storename { get; set; }

        public string IndexName { get; set; }

        public T QueryValue { get; set; }

        public bool AllMatching { get; set; }
    }
}
