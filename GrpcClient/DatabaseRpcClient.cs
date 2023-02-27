using GrpcClient.ServerConnection;
using RpcContracts.DatabaseMessages;
using RpcContracts.Services;

namespace GrpcClient;

public class DatabaseRpcClient: IDatabaseService
{
    private readonly IDatabaseService _server;

    public DatabaseRpcClient(ServerConnectionProvider serverConnection)
    {
        _server = serverConnection.CreateService();
    }

    public IEnumerable<DatabaseMessage> GetDatabases()
    {
        return _server.GetDatabases();
    }

    public DatabaseMessage GetDatabase(string id)
    {
        return _server.GetDatabase(id);
    }

    public DatabaseTableMessage GetDatabaseTable(DatabaseTableMessage message)
    {
        return _server.GetDatabaseTable(message);
    }

    public DatabaseMessage CreateDatabase(DatabaseCreateMessage databaseCreateMessage)
    {
        return _server.CreateDatabase(databaseCreateMessage);
    }
}