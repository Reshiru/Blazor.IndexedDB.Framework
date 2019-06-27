using System.Collections.Generic;
using System.Threading.Tasks;

namespace Blazor.IndexedDB.Framework.Connector
{
    public interface IIndexedDbConnector
    {
        public bool Connected { get; }

        Task<IList<T>> GetRecords<T>(string storeName);
    }
}
