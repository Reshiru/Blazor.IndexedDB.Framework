using Microsoft.JSInterop;
using System;
using System.Threading.Tasks;

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
        public async Task<T> Create<T>() where T : IndexedDb
        {
            var instance = (T)Activator.CreateInstance(typeof(T), this.jSRuntime, typeof(T).Name, 1);

            var connected = await instance.WaitForConnection();

            if (!connected)
            {
                throw new Exception("Could not connect");
            }

            return instance;
        }

        /// <summary>
        /// Creates a new instance of the given indexed db type
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="version">IndexedDb version</param>
        /// <returns></returns>
        public async Task<T> Create<T>(int version) where T : IndexedDb
        {
            var instance = (T)Activator.CreateInstance(typeof(T), this.jSRuntime, typeof(T).Name, version);

            var connected = await instance.WaitForConnection();

            if (!connected)
            {
                throw new Exception("Could not connect");
            }

            return instance;
        }

        /// <summary>
        /// Creates a new instance of the given indexed db type
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="name">IndexedDb name</param>
        /// <returns></returns>
        public async Task<T> Create<T>(string name) where T : IndexedDb
        {
            var instance = (T)Activator.CreateInstance(typeof(T), this.jSRuntime, name, 1);

            var connected = await instance.WaitForConnection();

            if (!connected)
            {
                throw new Exception("Could not connect");
            }

            return instance;
        }

        /// <summary>
        /// Creates a new instance of the given indexed db type
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="name">IndexedDb name</param>
        /// <param name="name">IndexedDb version</param>
        /// <returns></returns>
        public async Task<T> Create<T>(string name, int version) where T : IndexedDb
        {
            var instance = (T)Activator.CreateInstance(typeof(T), this.jSRuntime, name, version);

            var connected = await instance.WaitForConnection();

            if (!connected)
            {
                throw new Exception("Could not connect");
            }

            return instance;
        }
    }
}
