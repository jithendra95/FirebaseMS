namespace GrpcServer.Repository;

public interface IRepository<T>
{
    bool Save(T value);

    T Read(string id);
    
    IEnumerable<T> ReadAll(string id);
}