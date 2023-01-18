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


    private async Task<Database> LoadDatabase()
    {
        _database = await _realtimeDbFactory.CreateRealtimeDb();
        return _database;
    }
    public Task<Database> GetDatabase()
    {
        return _database != null ? Task.FromResult(_database) : LoadDatabase();
    }
}