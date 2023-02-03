using System.Text.Json.Nodes;

namespace Connection;

public interface IDatabaseApi<T>
{
    public T Read(T newObject);
    
    public bool Create(T newObject);
    
    public bool Update(string id, T newObject);
    
    public bool Delete(string id);
}