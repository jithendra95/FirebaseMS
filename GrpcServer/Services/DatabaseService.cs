using Domain;
using FirebaseDatabase;

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

    public IEnumerable<Database> GetDatabases()
    {
        return _databaseFactory.GetAllDatabases();
    }
    public Database GetDatabase(string id)
    {
        return LoadDatabase(id);
    }
    
    private Database LoadDatabase(string id)
    {
        return _databaseFactory.GetDatabase(id);
    }
}