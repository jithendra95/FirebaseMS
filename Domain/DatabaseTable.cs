namespace Domain;

public sealed class DatabaseTable : IDatabaseTable
{
    public string Name { get; set; }
    public string Path { get; set; }
    public string ParentPath { get; set; }
    public IEnumerable<DatabaseTableRecord> Records { get; set; }


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