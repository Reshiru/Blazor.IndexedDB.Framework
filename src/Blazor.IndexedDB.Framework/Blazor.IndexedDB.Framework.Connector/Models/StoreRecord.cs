namespace Blazor.IndexedDB.Framework.Connector.Models
{
    public class StoreRecord<T>
    {
        public string Storename { get; set; }

        public T Data { get; set; }

        public object Key { get; set; }
    }
}
