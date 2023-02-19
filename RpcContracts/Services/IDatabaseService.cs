using System.ServiceModel;
using RpcContracts.DatabaseMessages;

namespace RpcContracts.Services;
[ServiceContract]
public interface IDatabaseService
{
    [OperationContract]
    IEnumerable<DatabaseMessage> GetDatabases();
    
    [OperationContract]
    DatabaseMessage GetDatabase(string id);
}