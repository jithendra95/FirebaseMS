using Domain.Extensions;

namespace Domain;
public class Database : IDatabase
{
    public string Id { get; }
    public string PathToCredentials { get; }
    public string DatabaseUrl { get; }
    public string DatabaseName { get; }
    public DatabaseTypeEnum DatabaseType;
    
    public IEnumerable<DatabaseTable> UnstructuredTables { get; set; }
    
    public IEnumerable<DatabaseTable> Tables => UnstructuredTables.ToOriginalTree();


    public Database(string id, string pathToCredentials, string databaseUrl, IEnumerable<DatabaseTable> tables,
        DatabaseTypeEnum databaseType, string databaseName)
    {
        Id = id;
        UnstructuredTables = tables;
        PathToCredentials = pathToCredentials;
        DatabaseUrl = databaseUrl;
        DatabaseType = databaseType;
        DatabaseName = databaseName;
    }

    public DatabaseTable GetTable(string path)
    {
        return UnstructuredTables.First(x => x.Path == path);
    }
}

public enum DatabaseTypeEnum
{
    Firestore,
    Realtimedb
}