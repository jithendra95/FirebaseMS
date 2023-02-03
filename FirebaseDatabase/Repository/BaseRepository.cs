namespace FirebaseDatabase.Repository;

public class BaseRepository<T> : IRepository<T>
{
    public bool Save(T value)
    {
        throw new NotImplementedException();
    }

    public T Read(string id)
    {
        throw new NotImplementedException();
    }

    public IEnumerable<T> ReadAll(string id)
    {
        throw new NotImplementedException();
    }
}