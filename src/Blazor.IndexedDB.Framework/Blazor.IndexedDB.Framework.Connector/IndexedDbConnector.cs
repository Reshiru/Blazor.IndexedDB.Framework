using Blazor.IndexedDB.Framework.Connector.Models;
using Microsoft.JSInterop;
using System;
using System.Collections.Generic;
using System.Diagnostics;

namespace Blazor.IndexedDB.Framework.Connector
{
    public class IndexedDbConnector : IIndexedDbConnector
    {
        private const string callbackMethod = "Callback";

        private readonly DbStore dbStore;
        private readonly IJSInProcessRuntime jsRuntime;
        private readonly string interopPrefix;
        private readonly DotNetObjectRef<IndexedDbConnector> dotNetObjectRef;
        
        public IndexedDbConnector(
            DbStore dbStore, 
            IJSInProcessRuntime jsRuntime) : this(dbStore, jsRuntime, "TimeGhost.IndexedDbManager") { }

        public IndexedDbConnector(
            DbStore dbStore,
            IJSInProcessRuntime jsRuntime, 
            string interopPrefix)
        {
            this.dbStore = dbStore;
            this.jsRuntime = jsRuntime;
            this.interopPrefix = interopPrefix;

            this.dotNetObjectRef = DotNetObjectRef.Create(this);
        }

        public bool Connected { get; private set; }
        
        public IList<T> GetRecords<T>(string storeName)
        {
            try
            {
                var results = this.CallJavascript<List<T>>(ExposedFunctions.GetRecords, storeName);

                Debug.WriteLine($"{nameof(IndexedDbConnector)} - {nameof(GetRecords)} - Retrieved {results.Count} records from {storeName}");

                return results;
            }
            catch (Exception)
            {
                Debug.WriteLine($"{nameof(IndexedDbConnector)} - {nameof(GetRecords)} - Could not retrive records from {storeName}");

                throw;
            }
        }


        [JSInvokable(IndexedDbConnector.callbackMethod)]
        public void JavaScriptCallback(string message)
        {
            Debug.WriteLine(message);
        }

        /// <summary>
        /// Call any js function
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <typeparam name="R"></typeparam>
        /// <param name="functionName"></param>
        /// <param name="data"></param>
        /// <returns></returns>
        private R CallJavascript<T, R>(string functionName, T data)
        {
            if (!this.Connected)
            {
                this.Connect();
            }

            Debug.WriteLine($"{nameof(IndexedDbConnector)} - Call JS - with {functionName} data type{typeof(T).FullName}");

            return this.jsRuntime.Invoke<R>($"{this.interopPrefix}.{functionName}", data);
        }

        /// <summary>
        /// Call any js function
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <typeparam name="R"></typeparam>
        /// <param name="functionName"></param>
        /// <param name="data"></param>
        /// <returns></returns>
        private R CallJavascript<R>(string functionName, params object[] args)
        {
            if (!this.Connected)
            {
                this.Connect();
            }

            Debug.WriteLine($"{nameof(IndexedDbConnector)} - Call JS - with {functionName} params {string.Join(",", args)}");

            var response = this.jsRuntime.Invoke<R>($"{this.interopPrefix}.{functionName}", args);

            return response;
        }

        private void Connect()
        {
            Debug.WriteLine($"{nameof(IndexedDbConnector)} - Connecting");

            var response = this.CallJavascript<string>(ExposedFunctions.OpenDatabase, this.dbStore, new { Instance = this.dotNetObjectRef, MethodName = IndexedDbConnector.callbackMethod });

            Debug.WriteLine($"{nameof(IndexedDbConnector)} - Connecting CONNECTED with response {response}");

            this.Connected = true;
        }
    }
}
