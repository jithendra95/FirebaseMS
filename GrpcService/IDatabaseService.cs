using System.ServiceModel;
using RpcContracts.DatabaseMessages;

namespace GrpcService;
[ServiceContract]
public interface IDatabaseService
{
    [OperationContract]
    IEnumerable<DatabaseMessage> GetDatabases();
    
    [OperationContract]
    DatabaseMessage GetDatabase(string id);
}