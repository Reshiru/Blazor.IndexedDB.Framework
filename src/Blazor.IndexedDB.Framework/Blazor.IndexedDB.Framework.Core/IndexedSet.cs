using System.Collections;
using System.Collections.Generic;
using System.Linq;
using TG.Blazor.IndexedDB;

namespace Blazor.IndexedDB.Framework.Core
{
    public class IndexedSet<T> : IEnumerable<T> where T : new()
    {
        /// <summary>
        /// Injected visa <see cref="IndexedDb"/> builder.
        /// </summary>
        private readonly IndexedDBManager indexedDBManager;

        /// <summary>
        /// Injected visa <see cref="IndexedDb"/> builder.
        /// </summary>
        private readonly string storeName;

        private readonly ICollection<IndexedItem> indexedItems;

        public IndexedSet(IndexedDBManager indexedDBManager, string storeName)
        {
            this.indexedDBManager = indexedDBManager;
            this.storeName = storeName;

            var records = this.indexedDBManager.GetRecords<T>(this.storeName).Result;


            foreach (var record in records)
            {
                indexedItems.Add(new IndexedItem())
            }
        }

        public bool IsReadOnly => false;

        public int Count => this.Count();

        public void Add(T item)
        {
            if (changedEntities.ContainsKey(item))
            {
                this.changedEntities[item] = EntityState.Added;
            }
            else
            {
                this.changedEntities.Add(item, EntityState.Added);
            }
        }

        public void Clear()
        {
            foreach (var item in this)
            {
                if (changedEntities.ContainsKey(item))
                {
                    this.changedEntities[item] = EntityState.Deleted;
                }
                else
                {
                    this.changedEntities.Add(item, EntityState.Deleted);
                }
            }
        }

        public bool Contains(T item)
        {
            return Enumerable.Contains(this, item);
        }

        public bool Remove(T item)
        {
            if (changedEntities.ContainsKey(item))
            {
                this.changedEntities[item] = EntityState.Deleted;
            }
            else
            {
                this.changedEntities.Add(item, EntityState.Deleted);
            }

            return true;
        }

        public IEnumerator<T> GetEnumerator()
        {
            var records = this.indexedDBManager.GetRecords<T>(this.storeName).Result;
                        
            return records as IEnumerator<T>;
        }
        
        IEnumerator IEnumerable.GetEnumerator()
        {
            return this.GetEnumerator();
        }
    }
}
