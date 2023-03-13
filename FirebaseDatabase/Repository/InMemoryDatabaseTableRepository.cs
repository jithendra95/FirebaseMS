using Domain;

namespace FirebaseDatabase.Repository;

public class InMemoryDatabaseTableRepository
{
    private readonly IDatabaseApi _databaseTableApi;
    private IList<DatabaseTable> _databaseTables;

    public InMemoryDatabaseTableRepository(IDatabaseApi databaseTableApi)
    {
        _databaseTableApi = databaseTableApi;
        _databaseTables = new List<DatabaseTable>();
    }

    public IEnumerable<DatabaseTable> LoadTables(Database database)
    {
        var tables =  _databaseTableApi.Read(database);
        var databaseTables = tables.ToList();
        foreach (var databaseTable in databaseTables)
        {
            _databaseTables.Add(databaseTable);
        }

        return databaseTables;
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