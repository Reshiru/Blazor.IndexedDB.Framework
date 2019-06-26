namespace Blazor.IndexedDB.Framework.Connector
{
    public static class ExposedFunctions
    {
        // Database
        public static string OpenDatabase = "openDb";
        public static string CreateDatabase = "createDb";
        public static string DeleteDatabase = "deleteDb";

        // Record manipulation
        public static string AddRecord = "addRecord";
        public static string UpdateRecord = "updateRecord";
        public static string DeleteRecord = "deleteRecord";

        // Record read
        public static string GetRecords = "getRecords";
        public static string GetAllRecordsByIndex = "getAllRecordsByIndex";
        public static string GetRecordById = "getRecordById";
        public static string GetRecordByIndex = "getRecordByIndex";

        // Store
        public static string ClearStore = "clearStore";
    }
}
