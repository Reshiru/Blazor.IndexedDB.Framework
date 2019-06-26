namespace Blazor.IndexedDB.Framework.Core
{
    /// <summary>
    /// Based on: https://docs.microsoft.com/en-us/dotnet/api/system.data.entitystate?view=netframework-4.8
    /// </summary>
    public enum EntityState
    {
        Detached = 1,
        Unchanged = 2,
        Added = 4,
        Deleted = 8,
        Modified = 16
    }
}
