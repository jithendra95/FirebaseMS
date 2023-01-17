namespace Domain;

public sealed class DatabaseTable : IDatabaseTable
{
    public readonly string Name;
    public string Path { get; }
    public string ParentPath { get; }
    public IEnumerable<DatabaseTableRecord> Records { get; }

    public DatabaseTable(string name,
        string path,
        IEnumerable<DatabaseTableRecord> records, string parentPath)
    {
        Name = name;
        Path = path;
        Records = records;
        ParentPath = parentPath;
    }
}