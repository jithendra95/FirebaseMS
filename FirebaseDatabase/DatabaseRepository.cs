using Domain;
using FirebaseDatabase.Repository;

namespace FirebaseDatabase;

public class DatabaseRepository : IDatabaseRepository
{
    private readonly IDatabaseApi _api;
    private readonly IRepository<Database> _databaseStorageRepository;

    public DatabaseRepository(IDatabaseApi api, IRepository<Database> databaseStorageRepository)
    {
        _api = api;
        _databaseStorageRepository = databaseStorageRepository;
    }

    public Database GetDatabase(string id)
    {
        var database = _databaseStorageRepository.Read(id);
        return database.DatabaseType switch
        {
            DatabaseTypeEnum.Realtimedb => _api.Read(database),
            DatabaseTypeEnum.Firestore => throw new NotImplementedException(),
            _ => throw new InvalidDataException()
        };
    }

    public IEnumerable<Database> GetAllDatabases()
    {
        return _databaseStorageRepository.ReadAll();
    }
}