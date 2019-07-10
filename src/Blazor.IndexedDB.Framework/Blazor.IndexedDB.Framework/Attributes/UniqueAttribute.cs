using System;

namespace Blazor.IndexedDB.Framework.Attributes
{
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false)]
    public sealed class UniqueAttribute : Attribute { }
}
