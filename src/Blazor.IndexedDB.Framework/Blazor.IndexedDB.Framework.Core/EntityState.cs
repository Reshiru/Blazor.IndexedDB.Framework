namespace Blazor.IndexedDB.Framework.Core
{
    /// <summary>
    /// Based on: https://docs.microsoft.com/en-us/dotnet/api/system.data.entitystate?view=netframework-4.8
    /// </summary>
    public enum EntityState
    {
        /// <summary>
        /// Deleted from the database
        /// </summary>
        Detached = 1,
        /// <summary>
        /// Nothing happend
        /// </summary>
        Unchanged = 2,
        /// <summary>
        /// Entity added
        /// </summary>
        Added = 4,
        /// <summary>
        /// Entity deleted
        /// </summary>
        Deleted = 8,
        /// <summary>
        /// Entity changed
        /// </summary>
        Modified = 16
    }
}
