using Domain;
using FirebaseDatabase.Repository;

namespace FirebaseDatabase;

public interface IDatabaseRepository
{
    public Database GetDatabase(string id);
    public IEnumerable<Database> GetAllDatabases();
}