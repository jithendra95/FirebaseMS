using System.ServiceModel;
using Domain;

namespace GrpcServer;
[ServiceContract]
public interface IDatabaseService
{
    [OperationContract]
    Database GetDatabase();
}