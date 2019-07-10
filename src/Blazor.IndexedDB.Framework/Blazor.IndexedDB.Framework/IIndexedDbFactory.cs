using System.Threading.Tasks;

namespace Blazor.IndexedDB.Framework
{
    public interface IIndexedDbFactory
    {
        /// <summary>
        /// Creates a new instance of the given indexed db type
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <returns></returns>
        Task<T> Create<T>() where T : IndexedDb;

        /// <summary>
        /// Creates a new instance of the given indexed db type
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="version">IndexedDb version</param>
        /// <returns></returns>
        Task<T> Create<T>(int version) where T : IndexedDb;

        /// <summary>
        /// Creates a new instance of the given indexed db type
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="name">IndexedDb name</param>
        /// <returns></returns>
        Task<T> Create<T>(string name) where T : IndexedDb;

        /// <summary>
        /// Creates a new instance of the given indexed db type
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="name">IndexedDb name</param>
        /// <param name="name">IndexedDb version</param>
        /// <returns></returns>
        Task<T> Create<T>(string name, int version) where T : IndexedDb;
    }
}
