using System.Collections.Generic;

namespace Blazor.IndexedDB.Framework.Connector
{
    public interface IIndexedDbConnector
    {
        public bool Connected { get; }

        IList<T> GetRecords<T>(string storeName);
    }
}
