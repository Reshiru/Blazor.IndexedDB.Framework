using System;

namespace Blazor.IndexedDB.Framework.Attributes
{
    /// <summary>
    /// Indicates that the property should not be expected to be a reference but rather a
    /// stored object independent of other data
    /// </summary>
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false)]
    public class SerializeAttribute : Attribute { }
}
