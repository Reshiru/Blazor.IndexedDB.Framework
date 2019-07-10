using System.Collections.Generic;
using System.Diagnostics;

namespace Blazor.IndexedDB.Framework
{
    internal class IndexedEntity<T> : IndexedEntity
    {
        internal const int defaultHashCode = -1;
        private readonly IDictionary<string, int> snapshot;

        internal IndexedEntity(T instance) : base(instance)
        {
            this.snapshot = new Dictionary<string, int>();

            this.TakeSnapshot();
        }

        internal new T Instance => (T)base.Instance;

        internal void TakeSnapshot()
        {
            this.snapshot.Clear();

            var properties = typeof(T).GetProperties();

            foreach (var property in properties)
            {
                var code = property.GetValue(this.Instance)?.GetHashCode() ?? defaultHashCode;
                // ToDo: Check if GetHashCode collisions may occour and its severity
                this.snapshot.Add(property.Name, code);
                Debug.WriteLine($"Took snapshot of property {property.Name} with code {code}");
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
                this.snapshot.TryGetValue(property.Name, out var originalValue);

                // ToDo: Check if GetHashCode collisions may occour and its severity
                if (originalValue == (property.GetValue(this.Instance)?.GetHashCode() ?? defaultHashCode))
                {
                    continue;
                }

                this.State = EntityState.Modified;
            }
        }
    }

    internal abstract class IndexedEntity
    {
        internal IndexedEntity(object instance)
        {
            this.Instance = instance;
        }

        internal EntityState State { get; set; }

        internal object Instance { get; }
    }
}
