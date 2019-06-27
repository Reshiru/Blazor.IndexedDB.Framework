using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;

namespace Blazor.IndexedDB.Framework.Core
{
    public class IndexedSet<T> : IEnumerable<T> where T : new()
    {
        /// <summary>
        /// The internal stored items
        /// </summary>
        private IList<IndexedEntity<T>> internalItems;

        public IndexedSet(IEnumerable<T> records)
        {
            this.internalItems = new List<IndexedEntity<T>>();
            
            Debug.WriteLine("IndexedSet - Construct - Add records");

            foreach (var item in records)
            {
                this.internalItems.Add(new IndexedEntity<T>(item)
                {
                    State = EntityState.Unchanged
                });
            }

            Debug.WriteLine("IndexedSet - Construct - Add records DONE");
        }

        public bool IsReadOnly => false;

        public int Count => this.Count();

        public void Add(T item)
        {
            if (!this.internalItems.Select(x => x.Instance).Contains(item))
            {
                this.internalItems.Add(new IndexedEntity<T>(item));
            }
        }

        public void Clear()
        {
            foreach (var item in this)
            {
                this.Remove(item);
            }
        }

        public bool Contains(T item)
        {
            return Enumerable.Contains(this, item);
        }

        public bool Remove(T item)
        {
            var internalItem = this.internalItems.FirstOrDefault(x => x.Instance.Equals(item));

            if (internalItem != null)
            {
                internalItem.State = EntityState.Deleted;

                return true;
            }

            return false;
        }

        public IEnumerator<T> GetEnumerator()
        {
            return this.internalItems.Select(x => x.Instance) as IEnumerator<T>;
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return this.GetEnumerator();
        }

        internal IList<IndexedEntity<T>> GetChanged()
        {
            var result = new List<IndexedEntity<T>>();

            foreach (var item in this.internalItems)
            {
                item.DetectChanges();

                if (item.State == EntityState.Unchanged)
                {
                    continue;
                }

                result.Add(item);
            }

            return result;
        }
    }
}
