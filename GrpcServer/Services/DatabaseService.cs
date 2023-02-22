using FirebaseDatabase;
using RpcContracts.DatabaseMessages;
using RpcContracts.Extensions;
using RpcContracts.Services;

namespace GrpcServer.Services;

public class DatabaseService : IDatabaseService
{
    private readonly ILogger<DatabaseService> _logger;
    private readonly IDatabaseRepository _databaseRepository;


    public DatabaseService(ILogger<DatabaseService> logger, IDatabaseRepository databaseRepository)
    {
        _logger = logger;
        _databaseRepository = databaseRepository;
    }

    public IEnumerable<DatabaseMessage> GetDatabases()
    {
        return _databaseRepository.GetAllDatabases().Select(x => x.ToMessage());
    }

    public DatabaseMessage GetDatabase(string id)
    {
        return _databaseRepository.GetDatabase(id).ToMessage();
    }

    public DatabaseTableMessage GetDatabaseTable(DatabaseTableMessage message)
    {
        return _databaseRepository.GetDatabase(message.DatabaseId).GetTable(message.Path).ToMessage(true);
    }
}