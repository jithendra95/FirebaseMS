using Domain;

namespace FirestoreDatabase;

public class RealtimeDbFactory
{
    private readonly RealtimeDbApi _api;

    public RealtimeDbFactory(RealtimeDbApi api)
    {
        _api = api;
    }

    public async Task<Database> CreateRealtimeDb()
    {
        var tables = await _api.ReadAll();
        return new Database(tables);
    }
}