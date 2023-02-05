namespace FirebaseDatabase.Repository;

public interface IRepository<T>
{
    bool Save(T database);

    T Read(string id);
    
    IEnumerable<T> ReadAll();
}