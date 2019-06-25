using Microsoft.JSInterop;
using System;

namespace Blazor.IndexedDB.Framework.Core
{
    public class IndexedDbFactory : IIndexedDbFactory
    {
        private readonly IJSRuntime jSRuntime;

        public IndexedDbFactory(IJSRuntime jSRuntime)
        {
            this.jSRuntime = jSRuntime;
        }

        /// <summary>
        /// Creates a new instance of the given indexed db type
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        public T Create<T>() where T : IndexedDb
        {
            return (T)Activator.CreateInstance(typeof(T), this.jSRuntime, typeof(T).Name, 1);
        }

        /// <summary>
        /// Creates a new instance of the given indexed db type
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="name">IndexedDb name</param>
        /// <returns></returns>
        public T Create<T>(string name) where T : IndexedDb
        {
            return (T)Activator.CreateInstance(typeof(T), this.jSRuntime, name, 1);
        }

        /// <summary>
        /// Creates a new instance of the given indexed db type
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="name">IndexedDb name</param>
        /// <param name="name">IndexedDb version</param>
        /// <returns></returns>
        public T Create<T>(string name, int version) where T : IndexedDb
        {
            return (T)Activator.CreateInstance(typeof(T), this.jSRuntime, name, version);
        }
    }
}
