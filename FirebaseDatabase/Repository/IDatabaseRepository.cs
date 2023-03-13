using Domain;

namespace FirebaseDatabase.Repository;

public interface IDatabaseRepository
{
    public Database CreateDatabase(string databaseUrl, DatabaseTypeEnum databaseType, string fileName, string base64File);
    public Database GetDatabase(string id);
    public IEnumerable<Database> GetAllDatabases();
    public bool DisconnectDatabase(string id);
}