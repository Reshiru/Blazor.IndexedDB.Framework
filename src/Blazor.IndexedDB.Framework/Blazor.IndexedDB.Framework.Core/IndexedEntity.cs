using System.Collections.Generic;

namespace Blazor.IndexedDB.Framework.Core
{
    internal class IndexedEntity<T>
    {
        private IDictionary<string, object> snapshot;

        internal IndexedEntity(T instance)
        {
            this.snapshot = new Dictionary<string, object>();
            this.Instance = instance;

            this.TakeSnapshot();
        }

        internal EntityState State { get; set; }

        internal T Instance { get; }

        internal void TakeSnapshot()
        {
            this.snapshot.Clear();

            var properties = typeof(T).GetProperties();

            foreach (var property in properties)
            {
                this.snapshot.Add(property.Name, property.GetValue(this.Instance));
            }
        }

        internal void DetectChanges()
        {
            if (this.State == EntityState.Added ||
               this.State == EntityState.Deleted ||
               this.State == EntityState.Detached)
            {
                return;
            }

            var properties = typeof(T).GetProperties();

            foreach (var property in properties)
            {
                snapshot.TryGetValue(property.Name, out var originalValue);

                if (originalValue == property.GetValue(this.Instance))
                {
                    continue;
                }

                this.State = EntityState.Modified;
            }
        }
    }
}
