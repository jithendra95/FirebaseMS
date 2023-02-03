using Domain;
using GrpcClient.ServerConnection;
using GrpcServer;

namespace GrpcClient;

public class DatabaseRpcClient: IDatabaseService
{
    private readonly IDatabaseService _server;

    public DatabaseRpcClient(ServerConnectionProvider serverConnection)
    {
        _server = serverConnection.CreateService();
    }

    public IEnumerable<Database> GetDatabases()
    {
        return _server.GetDatabases();
    }

    public Database GetDatabase(string id)
    {
        return _server.GetDatabase(id);
    }
}