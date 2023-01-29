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

    public Database GetDatabase()
    {
        return _server.GetDatabase();
    }
}