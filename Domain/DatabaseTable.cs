namespace Domain;


public sealed class DatabaseTable : IDatabaseTable
{
    public string Name { get; set; }
    public string Path { get; set; }
    public string ParentPath { get; set; }
    public IEnumerable<DatabaseTableRecord> Records { get; set; }
    public IEnumerable<DatabaseTable> Tables { get; set; }


    public DatabaseTable(string name,
        string path,
        IEnumerable<DatabaseTableRecord> records, IEnumerable<DatabaseTable> tables,string parentPath)
    {
        Name = name;
        Path = path;
        Records = records;
        Tables = tables;
        ParentPath = parentPath;
    }
}