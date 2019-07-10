using Blazor.IndexedDB.Framework.Core.Attributes;
using Blazor.IndexedDB.Framework.Core.Extensions;
using Microsoft.JSInterop;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using TG.Blazor.IndexedDB;

namespace Blazor.IndexedDB.Framework.Core
{
    public abstract class IndexedDb : IDisposable
    {
        private readonly Task init;

        private IndexedDBManager connector;

        public IndexedDb(IJSRuntime jSRuntime, string name, int version)
        {
            this.Version = version;
            this.Name = name;

            var dbStore = new DbStore()
            {
                DbName = this.Name,
                Version = this.Version,
            };

            Debug.WriteLine($"{nameof(IndexedDb)} - Building database {name} V{version}");
            this.Build(dbStore);

            Debug.WriteLine($"{nameof(IndexedDb)} - Opening connector");
            this.connector = new IndexedDBManager(dbStore, jSRuntime);

            Debug.WriteLine($"{nameof(IndexedDb)} - Loading data");
            this.init = this.LoadData();

            this.connector.ActionCompleted += Connector_ActionCompleted;
        }

        private void Connector_ActionCompleted(object sender, IndexedDBNotificationArgs e)
        {
            Debug.WriteLine(e.Message);
        }

        /// <summary>
        /// The database name
        /// </summary>
        public string Name { get; }

        /// <summary>
        /// The database version
        /// </summary>
        public int Version { get; }

        public async Task<bool> WaitForConnection()
        {
            Debug.WriteLine("Waiting for connection...");

            await Task.WhenAll(this.init);

            Debug.WriteLine("Connected with " + (this.init.IsFaulted ? "Error" : "Success"));

            return this.init.IsCompleted && !this.init.IsFaulted;
        }

        public async Task SaveChanges()
        {
            Debug.WriteLine($"Saving changes...");

            var tables = this.GetType().GetProperties()
                .Where(x => x.PropertyType.IsGenericType && x.PropertyType.GetGenericTypeDefinition() == typeof(IndexedSet<>));

            foreach (var table in tables)
            {
                var indexedSet = table.GetValue(this);

                var changedRows = indexedSet.GetType().GetMethod("GetChanged", BindingFlags.NonPublic | BindingFlags.Instance).Invoke(indexedSet, null) as IList<IndexedEntity>;

                // Find pk here to reduce required save time if more than one row has been deleted 
                PropertyInfo pkProperty = null;

                foreach (var row in changedRows)
                {
                    Debug.WriteLine($"Saving row");
                    switch (row.State)
                    {
                        case EntityState.Detached:
                        case EntityState.Unchanged:
                            continue;
                        case EntityState.Added:
                            await this.AddRow(table.Name, row.Instance);
                            break;
                        case EntityState.Deleted:
                            if (pkProperty == null)
                            {
                                pkProperty = this.GetPrimaryKey(row.Instance.GetType(), table.Name);
                            }

                            await this.DeleteRow(table.Name, row.Instance, pkProperty);
                            break;
                        case EntityState.Modified:
                            await this.ChangeRow(table.Name, row.Instance);
                            break;
                        default:
                            throw new NotSupportedException();
                    }
                    Debug.WriteLine($"Row saved");
                }
            }

            Debug.WriteLine($"All changes saved");
        }

        /// <summary>
        /// Disposal of any managed / unmanaged ressource
        /// </summary>
        public void Dispose()
        {
            this.init?.Dispose();
        }

        /// <summary>
        /// Builds the schema
        /// </summary>
        /// <param name="dbStore"></param>
        private void Build(DbStore dbStore)
        {
            // Get all "tables"
            var storeSchemaProperties = this.GetType().GetProperties()
                .Where(x => x.PropertyType.IsGenericType && x.PropertyType.GetGenericTypeDefinition() == typeof(IndexedSet<>));

            // For all tables
            foreach (var schemaProperty in storeSchemaProperties)
            {
                // Create schema
                var schema = new StoreSchema()
                {
                    Name = schemaProperty.Name,
                    Indexes = new List<IndexSpec>(),
                };

                // Get generic parameter of list<T> (type T, only supports IndexedSet<T> ergo 1 parameter)
                var propertyType = schemaProperty.PropertyType.GetGenericArguments()[0];

                // Get all properties of the generic type T
                var properties = propertyType.GetProperties();

                foreach (var property in properties)
                {
                    // If any non supported object is used throw exception here
                    if (property.PropertyType.IsGenericType && !property.PropertyType.Namespace.StartsWith("System"))
                    {
                        throw new NotSupportedException(property.PropertyType.FullName);
                    }

                    // Get attributes from the entity property, ergo column
                    var attributes = property.CustomAttributes;

                    var id = false;
                    var unique = false;
                    var autoIncrement = false;
                    var foreignKey = false;

                    // Check for settings via attributes here (additonal attributes have to be checked here)
                    if (attributes.Any(x => x.AttributeType == typeof(KeyAttribute)))
                    {
                        id = true;
                    }
                    if (attributes.Any(x => x.AttributeType == typeof(UniqueAttribute)))
                    {
                        unique = true;
                    }
                    if (attributes.Any(x => x.AttributeType == typeof(AutoIncrementAttribute)))
                    {
                        autoIncrement = true;
                    }
                    if (attributes.Any(x => x.AttributeType == typeof(ForeignKeyAttribute)))
                    {
                        if (id)
                        {
                            throw new NotSupportedException("PK cannot be FK");
                        }

                        foreignKey = true;
                    }

                    var columnName = this.FirstToLower(property.Name);
                    // Define index
                    var index = new IndexSpec { Name = columnName, KeyPath = columnName, Auto = autoIncrement, Unique = unique };

                    // Register index
                    if (id)
                    {
                        // Throw invalid operation when index has already been defined
                        if (schema.PrimaryKey != null)
                        {
                            throw new InvalidOperationException("PK already defined");
                        }

                        Debug.WriteLine($"{nameof(IndexedDb)} - {schemaProperty.Name} - PK-> {columnName}");

                        index.Auto = true;
                        schema.PrimaryKey = index;
                    }
                    else if (!foreignKey)
                    {
                        Debug.WriteLine($"{nameof(IndexedDb)} - {schemaProperty.Name} - Property -> {columnName}");

                        schema.Indexes.Add(index);
                    }
                }

                // Create PK when not defined
                if (schema.PrimaryKey == null)
                {
                    var idPropertyName = "Id";
                    var idColumnName = this.FirstToLower(idPropertyName);

                    // Check for registered id property without declared key attribute
                    if (properties.Any(x => x.Name == idPropertyName))
                    {
                        var idProperty = schema.Indexes.Single(x => x.Name == idColumnName);

                        // Remove from schema
                        schema.Indexes.Remove(idProperty);

                        // And set as primary key
                        schema.PrimaryKey = idProperty;

                        // Set to auto, default setting
                        schema.PrimaryKey.Auto = true;
                    }
                    else
                    {
                        throw new NotSupportedException("Missing id property");
                        // Not supported because no implementation for changed check when deleted (missing id to resolve object in store)
                        //schema.PrimaryKey = new IndexSpec { Name = idColumnName, KeyPath = idColumnName, Auto = true };
                    }
                }

                // Add schema to registered schemas
                dbStore.Stores.Add(schema);
            }
            Debug.WriteLine($"{nameof(IndexedDb)} - Schema has been built");
        }

        /// <summary>
        /// First char to lower case
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        private string FirstToLower(string input)
        {
            if (input != string.Empty && char.IsUpper(input[0]))
            {
                input = char.ToLower(input[0]) + input.Substring(1);
            }

            return input;
        }

        /// <summary>
        /// Gets the pk from a table by any row type hold within the table
        /// </summary>
        /// <param name="rowType"></param>
        /// <param name="tableName"></param>
        /// <returns></returns>
        private PropertyInfo GetPrimaryKey(Type rowType, string tableName)
        {
            Debug.WriteLine($"Trying to resolve PK for {rowType.Name} in table {tableName}");

            var storePk = this.connector.Stores.Single(x => x.Name == tableName).PrimaryKey.KeyPath;

            return rowType.GetProperties().Single(x => this.FirstToLower(x.Name) == storePk);
        }

        private async Task LoadData()
        {
            // Get all tables
            var tables = this.GetType().GetProperties()
                .Where(x => x.PropertyType.IsGenericType && x.PropertyType.GetGenericTypeDefinition() == typeof(IndexedSet<>));

            foreach (var table in tables)
            {
                // Get generic parameter of list<T> (type T, only supports IndexedSet<T> ergo 1 parameter)
                var propertyType = table.PropertyType.GetGenericArguments()[0];

                // Get generic records of table
                Debug.WriteLine($"{nameof(IndexedDb)} - Load table {table.Name}");
                var records = await this.GetRows(propertyType, table.Name);

                var pkProperty = this.GetPrimaryKey(propertyType, table.Name);

                Debug.WriteLine($"{nameof(IndexedDb)} - Set table {table.Name}");
                table.SetValue(this, Activator.CreateInstance(table.PropertyType, records, pkProperty));

            }
        }

        private async Task<object> GetRows(Type propertyType, string storeName)
        {
            MethodInfo method = this.connector.GetType().GetMethod(nameof(this.connector.GetRecords));
            MethodInfo generic = method.MakeGenericMethod(propertyType);
            var records = await generic.InvokeAsyncWithResult(this.connector, new object[] { storeName });

            return records;
        }

        /// <summary>
        /// Removes a row from the store
        /// </summary>
        /// <param name="storeName"></param>
        /// <param name="data"></param>
        /// <param name="pkProperty"></param>
        /// <returns></returns>
        private async Task DeleteRow(string storeName, object data, PropertyInfo pkProperty)
        {
            var pkValue = pkProperty.GetValue(data);

            await this.connector.DeleteRecord<object>(storeName, pkValue);
        }

        /// <summary>
        /// Adds a row to the store
        /// </summary>
        /// <param name="storeName"></param>
        /// <param name="data"></param>
        /// <returns></returns>
        private async Task AddRow(string storeName, object data)
        {
            var storeRecord = this.ConvertToObjectRecord(storeName, data);

            await this.connector.AddRecord<object>(storeRecord);

            // TODO: OLD GENERIC IMPLEMENTATION / REMOVE
            //Type[] typeArgs = { data.GetType() };
            //var storeRecordType = typeof(StoreRecord<>).MakeGenericType(typeArgs);
            //var storeRecord = Activator.CreateInstance(storeRecordType);

            //storeRecordType.GetProperty("Data").SetValue(storeRecord, data);
            //storeRecordType.GetProperty("Storename").SetValue(storeRecord, storeName);

            //MethodInfo method = this.connector.GetType().GetMethod(nameof(this.connector.AddRecord));
            //MethodInfo generic = method.MakeGenericMethod(data.GetType());

            //await generic.InvokeAsync(this.connector, new object[] { storeRecord });
        }

        /// <summary>
        /// Changes the row data in the store
        /// </summary>
        /// <param name="storeName"></param>
        /// <param name="data"></param>
        /// <returns></returns>
        private async Task ChangeRow(string storeName, object data)
        {
            var storeRecord = this.ConvertToObjectRecord(storeName, data);

            await this.connector.UpdateRecord<object>(storeRecord);
        }

        // Only required to save to database, resolve will be = to object properties
        // Because -> Obj Person {"FirstName":"A","LastName":"B"} = Dictionary<string, object> {"FirstName":"A","LastName":"B"}
        // Usage dictionary instead of type for the possibility of ignoring properties, eg ForeignKeyAttribute properties
        private StoreRecord<object> ConvertToObjectRecord(string storeName, object data)
        {
            var properties = data.GetType().GetProperties().Where(x => x.CustomAttributes.All(y => y.AttributeType != typeof(ForeignKeyAttribute)));

            var keyValueData = new Dictionary<string, object>();

            foreach (var property in properties)
            {
                var propertyNameInStore = this.FirstToLower(property.Name);

                keyValueData.Add(propertyNameInStore, property.GetValue(data));
            }

            var storeRecord = new StoreRecord<object>()
            {
                Data = keyValueData,
                Storename = storeName
            };

            return storeRecord;
        }
    }
}
