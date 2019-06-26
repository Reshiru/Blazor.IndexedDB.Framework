using Blazor.IndexedDB.Framework.Connector;
using Blazor.IndexedDB.Framework.Connector.Models;
using Blazor.IndexedDB.Framework.Core.Attributes;
using Microsoft.JSInterop;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics;
using System.Linq;
using System.Reflection;

namespace Blazor.IndexedDB.Framework.Core
{
    public abstract class IndexedDb : IDisposable
    {
        private readonly IIndexedDbConnector connector;

        public IndexedDb(IJSRuntime jSRuntime, string name, int version)
        {
            this.Version = version;
            this.Name = name;

            var dbStore = new DbStore()
            {
                DbName = this.Name,
                Version = this.Version,
            };

            this.connector = new IndexedDbConnector(dbStore, jSRuntime as IJSInProcessRuntime);

            this.Build(dbStore);
        }

        /// <summary>
        /// The database name
        /// </summary>
        public string Name { get; }

        /// <summary>
        /// The database version
        /// </summary>
        public int Version { get; }

        /// <summary>
        /// All logged messages
        /// </summary>
        public List<string> Messages { get; set; }

        public void SaveChanges()
        {
            var tables = this.GetType().GetProperties()
                .Where(x => x.PropertyType.IsGenericType && x.PropertyType.GetGenericTypeDefinition() == typeof(IndexedSet<>));

            foreach (var table in tables)
            {
                var indexedSet = table.GetValue(this);

                var method = indexedSet.GetType().GetMethod("GetChanged").Invoke(indexedSet, null);


            }
        }

        /// <summary>
        /// Disposal of any managed / unmanaged ressource
        /// </summary>
        public void Dispose()
        {
        }

        /// <summary>
        /// Builds the schema
        /// </summary>
        /// <param name="dbStore"></param>
        private void Build(DbStore dbStore)
        {
            Debug.WriteLine($"{nameof(IndexedDb)} - Build - Invoked");
            // Get all "tables"
            var storeSchemaProperties = this.GetType().GetProperties()
                .Where(x => x.PropertyType.IsGenericType && x.PropertyType.GetGenericTypeDefinition() == typeof(IndexedSet<>));

            // For all tables
            foreach (var schemaProperty in storeSchemaProperties)
            {
                Debug.WriteLine($"{nameof(IndexedDb)} - Build - Invoked table {schemaProperty.Name}");

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
                    Debug.WriteLine($"{nameof(IndexedDb)} - Build - Invoked table {schemaProperty.Name} column - {property.Name}");

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

                    // Define index
                    var index = new IndexSpec { Name = property.Name, KeyPath = property.Name, Auto = autoIncrement, Unique = unique };

                    // Register index
                    if (id)
                    {
                        // Throw invalid operation when index has already been defined
                        if (schema.PrimaryKey != null)
                        {
                            throw new InvalidOperationException();
                        }

                        schema.PrimaryKey = index;
                    }
                    else
                    {
                        schema.Indexes.Add(index);
                    }
                }

                // Create PK when not defined
                if (schema.PrimaryKey == null)
                {
                    var idPropertyName = "Id";

                    // Check for registered id property without declared key attribute
                    if (properties.Any(x => x.Name == idPropertyName))
                    {
                        var idProperty = schema.Indexes.Single(x => x.Name == idPropertyName);

                        // Remove from schema
                        schema.Indexes.Remove(idProperty);

                        // And set as primary key
                        schema.PrimaryKey = idProperty;

                        // Set to auto, default setting
                        schema.PrimaryKey.Auto = true;
                    }
                    else
                    {
                        schema.PrimaryKey = new IndexSpec { Name = idPropertyName, KeyPath = idPropertyName, Auto = true };
                    }
                }

                // Get generic records of table
                Debug.WriteLine($"{nameof(IndexedDb)} - Build - {schemaProperty.Name} - Get records of type {propertyType.Name}");
                MethodInfo method = this.connector.GetType().GetMethod(nameof(this.connector.GetRecords));
                MethodInfo generic = method.MakeGenericMethod(propertyType);
                Debug.WriteLine($"{nameof(IndexedDb)} - Build - {schemaProperty.Name} - Get records of type {propertyType.Name} INVOKED");
                var records = generic.Invoke(this.connector, new object[] { schemaProperty.Name });
                Debug.WriteLine($"{nameof(IndexedDb)} - Build - {schemaProperty.Name} - Get records of type {propertyType.Name} SUCCESS");

                // Set table to new list (index db manager has to be injected, also the store name has to be passed)
                Debug.WriteLine($"{nameof(IndexedDb)} - Build - {schemaProperty.Name} - Set value {schemaProperty.Name} to {schemaProperty.PropertyType.FullName}");
                schemaProperty.SetValue(this, Activator.CreateInstance(schemaProperty.PropertyType, this.connector, schemaProperty.Name));

                // Add schema to registered schemas
                Debug.WriteLine($"{nameof(IndexedDb)} - Build - {schemaProperty.Name} - Add store");
                dbStore.Stores.Add(schema);
            }

            Debug.WriteLine($"{nameof(IndexedDb)} - Build - Done");
        }
    }
}
