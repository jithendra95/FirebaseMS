using Domain;

public interface ITableRepository
{
    IEnumerable<DatabaseTable> LoadTables(Database database);
    bool UnLoadTables(string databaseId);
    IEnumerable<DatabaseTable> GetTableFromDatabase(Database database);
    DatabaseTable GetTableFromId(string tablePath);
}