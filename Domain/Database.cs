namespace Domain;

public class Database : IDatabase
{
    public string Id { get;}

    public string PathToCredentials { get; }

    public DatabaseTypeEnum DatabaseType;
    public IEnumerable<DatabaseTable> Tables { get; set; }


    public Database(string id, string pathToCredentials, IEnumerable<DatabaseTable> tables)
    {
        Tables = tables;
        Id = id;
        PathToCredentials = pathToCredentials;
    }

    
}

public enum DatabaseTypeEnum
{
    realtimedb,
    firestore
}