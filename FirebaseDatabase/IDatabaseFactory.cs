using Domain;
using FirebaseDatabase.Repository;

namespace FirebaseDatabase;

public interface IDatabaseFactory
{
    public Database GetDatabase(string id);
    
    public IEnumerable<Database> GetAllDatabases();
}