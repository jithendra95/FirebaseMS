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
            return _databaseRepository.GetDatabase(id).ToMessage();
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
            return _databaseRepository.GetDatabase(message.DatabaseId).GetTable(message.Path).ToMessage(true);
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

    public bool DisconnectDatabase(string id)
    {
        return _databaseRepository.DisconnectDatabase(id);
    }
}