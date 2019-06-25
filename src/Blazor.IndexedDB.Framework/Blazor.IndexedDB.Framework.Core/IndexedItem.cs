using System.ComponentModel;

namespace Blazor.IndexedDB.Framework.Core
{
    internal class IndexedItem : INotifyPropertyChanged
    {
        public event PropertyChangedEventHandler PropertyChanged;

        public IndexedItem()
        {
            this.PropertyChanged += IndexedItem_PropertyChanged;
        }
        
        public EntityState EntityState { get; set; }

        private void IndexedItem_PropertyChanged(object sender, PropertyChangedEventArgs e)
        {
            if(this.EntityState == EntityState.Added ||
                this.EntityState == EntityState.Deleted) 
            {
                return;
            }

            this.EntityState = EntityState.Modified;
        }
    }
}
