using Domain;

namespace FirebaseDatabase.Repository;

public class DatabaseRepository
{
    public IEnumerable<Database> ReadAll()
    {
        return new List<Database>();
    }

    public Database Read(string id)
    {
        throw new NotImplementedException();
    }
}