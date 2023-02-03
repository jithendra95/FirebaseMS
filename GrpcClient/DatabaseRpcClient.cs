﻿using GrpcClient.ServerConnection;
using GrpcService;
using RpcContracts.DatabaseMessages;

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
}