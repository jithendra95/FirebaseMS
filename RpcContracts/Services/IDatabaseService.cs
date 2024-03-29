﻿using System.ServiceModel;
using RpcContracts.DatabaseMessages;

namespace RpcContracts.Services;
[ServiceContract]
public interface IDatabaseService
{
    [OperationContract]
    IEnumerable<DatabaseMessage> GetDatabases();
    
    [OperationContract]
    DatabaseMessage GetDatabase(string id);

    [OperationContract]
    DatabaseTableMessage GetDatabaseTable(DatabaseTableMessage message);
    
    [OperationContract]
    DatabaseMessage CreateDatabase(DatabaseCreateMessage databaseCreateMessage);

    [OperationContract]
    DatabaseDisconnectedMessage DisconnectDatabase(string id);
}