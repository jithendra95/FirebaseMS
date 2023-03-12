using Domain;

namespace FirebaseDatabase.Repository;

public class InMemoryDatabaseTableRepository
{
    private IEnumerable<DatabaseTable> _databaseTables;

    public InMemoryDatabaseTableRepository()
    {
        _databaseTables = new List<DatabaseTable>();
    }
    
    public IEnumerable<DatabaseTable> GetTableFromDatabase(string databaseId)
    {
        return _databaseTables.Where(table=> table.DatabaseId == databaseId);
    } 
    
    public DatabaseTable GetTableFromId(string tablePath)
    {
        return _databaseTables.First(table=> table.Path == tablePath);
    }
}