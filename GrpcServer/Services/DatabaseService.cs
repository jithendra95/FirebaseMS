using FirebaseDatabase;
using FirebaseDatabase.Repository;
using RpcContracts.DatabaseMessages;
using RpcContracts.Extensions;
using RpcContracts.Services;

namespace GrpcServer.Services;

public class DatabaseService : IDatabaseService
{
    private readonly ILogger<DatabaseService> _logger;
    private readonly IDatabaseRepository _databaseRepository;
    private readonly InMemoryDatabaseTableRepository _tableRepository;


    public DatabaseService(ILogger<DatabaseService> logger, IDatabaseRepository databaseRepository,
        InMemoryDatabaseTableRepository tableRepository)
    {
        _logger = logger;
        _databaseRepository = databaseRepository;
        _tableRepository = tableRepository;
    }

    public IEnumerable<DatabaseMessage> GetDatabases()
    {
        try
        {
            return _databaseRepository.GetAllDatabases().Select(x => x.ToMessage());
        }
        catch (Exception e)
        {
            _logger.LogError(e.ToString());
            return new List<DatabaseMessage>();
        }
    }

    public DatabaseMessage GetDatabase(string id)
    {
        try
        {
            var database = _databaseRepository.GetDatabase(id);
            var tables = _tableRepository.GetTableFromDatabase(database);
            return database.ToMessage(tables);
        }
        catch (Exception e)
        {
            _logger.LogError(e.ToString());
            throw;
        }
    }

    public DatabaseTableMessage GetDatabaseTable(DatabaseTableMessage message)
    {
        try
        {
            return _tableRepository.GetTableFromId(message.Path).ToMessage(true);
        }
        catch (Exception e)
        {
            _logger.LogError(e.ToString());
            throw;
        }
    }

    public DatabaseMessage CreateDatabase(DatabaseCreateMessage databaseCreateMessage)
    {
        try
        {
            return _databaseRepository.CreateDatabase(databaseCreateMessage.DatabaseUrl,
                databaseCreateMessage.DatabaseType,
                databaseCreateMessage.FileName, databaseCreateMessage.FileBase64).ToMessage();
        }
        catch (Exception e)
        {
            _logger.LogError(e.ToString());
            throw;
        }
    }

    public DatabaseDisconnectedMessage DisconnectDatabase(string id)
    {
        try
        {
            return new DatabaseDisconnectedMessage { IsDisconnected = _databaseRepository.DisconnectDatabase(id) };
        }
        catch (Exception e)
        {
            _logger.LogError(e.ToString());
            return new DatabaseDisconnectedMessage { IsDisconnected = false };
            ;
        }
    }
}