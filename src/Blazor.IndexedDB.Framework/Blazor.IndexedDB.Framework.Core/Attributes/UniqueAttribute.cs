using System;

namespace Blazor.IndexedDB.Framework.Core.Attributes
{
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false)]
    public sealed class UniqueAttribute : Attribute { }
}
