using System.ServiceModel;
using Domain;

namespace GrpcServer;
[ServiceContract]
public interface IDatabaseService
{
    [OperationContract]
    IEnumerable<Database> GetDatabases();
    
    [OperationContract]
    Database GetDatabase(string id);
}