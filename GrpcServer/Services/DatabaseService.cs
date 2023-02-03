using FirebaseDatabase;
using GrpcService;
using RpcContracts.DatabaseMessages;
using RpcContracts.Extensions;

namespace GrpcServer.Services;

public class DatabaseService: IDatabaseService
{
    private readonly ILogger<DatabaseService> _logger;
    private readonly IDatabaseFactory _databaseFactory;


    public DatabaseService(ILogger<DatabaseService> logger, IDatabaseFactory databaseFactory)
    {
        _logger = logger;
        _databaseFactory = databaseFactory;
    }

    public IEnumerable<DatabaseMessage> GetDatabases()
    {
        return _databaseFactory.GetAllDatabases().Select(x=> x.ToMessage());
    }
    public DatabaseMessage GetDatabase(string id)
    {
        return _databaseFactory.GetDatabase(id).ToMessage();
    }
    
}