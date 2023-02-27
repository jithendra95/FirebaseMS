using Domain;
using FirebaseDatabase.Repository;

namespace FirebaseDatabase;

public interface IDatabaseRepository
{
    public Database CreateDatabase(string databaseUrl, DatabaseTypeEnum databaseType, string fileName, string base64File);
    public Database GetDatabase(string id);
    public IEnumerable<Database> GetAllDatabases();
}