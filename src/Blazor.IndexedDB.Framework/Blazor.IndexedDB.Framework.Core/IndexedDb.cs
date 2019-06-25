using Blazor.IndexedDB.Framework.Core.Attributes;
using Microsoft.JSInterop;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using TG.Blazor.IndexedDB;

namespace Blazor.IndexedDB.Framework.Core
{
    public abstract class IndexedDb : IDisposable
    {
        private readonly IndexedDBManager indexedDBManager;

        public IndexedDb(IJSRuntime jSRuntime, string name, int version)
        {
            this.Version = version;
            this.Name = name;

            var dbStore = new DbStore()
            {
                DbName = this.Name,
                Version = this.Version,
            };

            this.indexedDBManager = new IndexedDBManager(dbStore, jSRuntime);

            this.Build(dbStore);

            this.indexedDBManager.ActionCompleted += OnIndexedDbNotification;
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


        }

        /// <summary>
        /// Disposal of any managed / unmanaged ressource
        /// </summary>
        public void Dispose()
        {
            this.indexedDBManager.ActionCompleted -= OnIndexedDbNotification;
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

                // Set table to new list (index db manager has to be injected, also the store name has to be passed)
                schemaProperty.SetValue(this, Activator.CreateInstance(schemaProperty.PropertyType, this.indexedDBManager, schemaProperty.Name));

                // Add schema to registered schemas
                dbStore.Stores.Add(schema);

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
                    schema.PrimaryKey = new IndexSpec { Name = "Id", KeyPath = "Id", Auto = true };
                }
            }
        }

        private void OnIndexedDbNotification(object sender, IndexedDBNotificationArgs args)
        {
            if (args?.Message == null)
            {
                return;
            }

            this.Messages.Add(args.Message);
        }
    }
}
