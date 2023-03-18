using Domain;

namespace FirebaseDatabase.Repository;

public class InMemoryDatabaseTableRepository
{
    private readonly IDatabaseApi _databaseTableApi;
    private readonly IList<DatabaseTable> _databaseTables;
    private readonly Dictionary<string, bool> _loadedDatabases;

    public InMemoryDatabaseTableRepository(IDatabaseApi databaseTableApi)
    {
        _databaseTableApi = databaseTableApi;
        _databaseTables = new List<DatabaseTable>();
        _loadedDatabases = new Dictionary<string, bool>();
    }

    private IEnumerable<DatabaseTable> LoadTables(Database database)
    {
        var tables = _databaseTableApi.Read(database);
        var databaseTables = tables.ToList();
        foreach (var databaseTable in databaseTables)
        {
            _databaseTables.Add(databaseTable);
        }

        _loadedDatabases.Add(database.Id, true);
        return databaseTables;
    }

    public IEnumerable<DatabaseTable> GetTableFromDatabase(Database database)
    {
        return _loadedDatabases.ContainsKey(database.Id)
            ? _databaseTables.Where(table => table.DatabaseId == database.Id)
            : LoadTables(database);
    }

    public DatabaseTable GetTableFromId(string tablePath)
    {
        return _databaseTables.First(table => table.Path == tablePath);
    }
}