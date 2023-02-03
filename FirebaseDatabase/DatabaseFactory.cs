using Domain;
using FirebaseDatabase.Repository;

namespace FirebaseDatabase;

public class DatabaseFactory : IDatabaseFactory
{
    private readonly RealtimeDbApi _api;
    private readonly DatabaseRepository _databaseRepository;

    public DatabaseFactory(RealtimeDbApi api, DatabaseRepository databaseRepository)
    {
        _api = api;
        _databaseRepository = databaseRepository;
    }

    public Database GetDatabase(string id)
    {
        var database = _databaseRepository.Read(id);
        return database.DatabaseType switch
        {
            DatabaseTypeEnum.realtimedb => _api.Read(database),
            DatabaseTypeEnum.firestore => throw new NotImplementedException(),
            _ => throw new InvalidDataException()
        };
    }

    public IEnumerable<Database> GetAllDatabases()
    {
        return _databaseRepository.ReadAll();
    }
}