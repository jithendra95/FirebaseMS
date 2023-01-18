using System.ServiceModel;
using Domain;

namespace GrpcService.Services;
[ServiceContract]
public interface IDatabaseService
{
    [OperationContract]
    Task<Database> GetDatabase();
}