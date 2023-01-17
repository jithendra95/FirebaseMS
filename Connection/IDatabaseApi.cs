using System.Text.Json.Nodes;

namespace Connection;

public interface IDatabaseApi<T>
{
    public T Read(string id);
    
    public Task<IEnumerable<T>> ReadAll();
    
    public bool Create(T newObject);
    
    public bool Update(string id, T newObject);
    
    public bool Delete(string id);
}