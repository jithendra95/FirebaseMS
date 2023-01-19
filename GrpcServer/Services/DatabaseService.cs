using Domain;
using FirestoreDatabase;

namespace GrpcService.Services;

public class DatabaseService: IDatabaseService
{
    private readonly ILogger<DatabaseService> _logger;
    private readonly RealtimeDbFactory _realtimeDbFactory;
    private Database? _database;

    public DatabaseService(ILogger<DatabaseService> logger, RealtimeDbFactory realtimeDbFactory)
    {
        _logger = logger;
        _realtimeDbFactory = realtimeDbFactory;
    }

    public Database GetDatabase()
    {
        return _database ?? LoadDatabase();
    }
    
    private Database LoadDatabase()
    {
        _database =  _realtimeDbFactory.CreateRealtimeDb().Result;
        return _database;
    }
}