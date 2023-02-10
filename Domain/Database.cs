namespace Domain;

public abstract class Database : IDatabase
{
    public string Id { get; }
    public string PathToCredentials { get; }
    public string DatabaseUrl { get; }
    public string DatabaseName { get; }
    public DatabaseTypeEnum DatabaseType { get; }
    public IEnumerable<DatabaseTable> Tables { get; set; }

    protected Database(string id, string pathToCredentials, string databaseUrl, IEnumerable<DatabaseTable> tables,
        DatabaseTypeEnum databaseType, string databaseName)
    {
        Id = id;
        Tables = tables;
        PathToCredentials = pathToCredentials;
        DatabaseUrl = databaseUrl;
        DatabaseType = databaseType;
        DatabaseName = databaseName;
    }
}

public enum DatabaseTypeEnum
{
    Realtimedb,
    Firestore
}