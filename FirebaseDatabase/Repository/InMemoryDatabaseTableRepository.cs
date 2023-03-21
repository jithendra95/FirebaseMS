using Domain;
using Domain.Extensions;

namespace FirebaseDatabase.Repository;



public class InMemoryDatabaseTableRepository : ITableRepository
{
    private readonly IDatabaseApi _databaseTableApi;
    private readonly List<DatabaseTable> _databaseTables;
    private readonly Dictionary<string, bool> _loadedDatabases;

    public InMemoryDatabaseTableRepository(IDatabaseApi databaseTableApi)
    {
        _databaseTableApi = databaseTableApi;
        _databaseTables = new List<DatabaseTable>();
        _loadedDatabases = new Dictionary<string, bool>();
    }

    public IEnumerable<DatabaseTable> LoadTables(Database database)
    {
        if (_databaseTableApi.Load(database))
        {
            var tables = _databaseTableApi.Read(database.Id);
            var databaseTables = tables.ToList();
            foreach (var databaseTable in databaseTables)
            {
                _databaseTables.Add(databaseTable);
            }

            _loadedDatabases.Add(database.Id, true);
        }
        return _databaseTables.Where(table=> table.DatabaseId == database.Id).ToOriginalTree();
    }

    public bool UnLoadTables(string databaseId)
    {
        if (!_loadedDatabases.ContainsKey(databaseId)) return false;
        if (!_databaseTableApi.Delete(databaseId)) return false;
        _loadedDatabases.Remove(databaseId);
        _databaseTables.RemoveAll(table => table.DatabaseId == databaseId);
        return true;
    }

    public IEnumerable<DatabaseTable> GetTableFromDatabase(Database database)
    {
        return _loadedDatabases.ContainsKey(database.Id)
            ? _databaseTables.Where(table => table.DatabaseId == database.Id).ToOriginalTree()
            : LoadTables(database);
    }

    public DatabaseTable GetTableFromId(string tablePath)
    {
        return _databaseTables.First(table => table.Path == tablePath);
    }
}