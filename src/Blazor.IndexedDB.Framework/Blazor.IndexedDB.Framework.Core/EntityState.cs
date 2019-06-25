namespace Blazor.IndexedDB.Framework.Core
{
    /// <summary>
    /// Based on: https://docs.microsoft.com/en-us/dotnet/api/system.data.entitystate?view=netframework-4.8
    /// </summary>
    public enum EntityState
    {
        Default = 0,
        Added = 4,
        Deleted = 8,
        Modified = 16
    }
}
