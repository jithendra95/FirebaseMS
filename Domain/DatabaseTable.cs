using ProtoBuf;

namespace Domain;

[ProtoContract]
public sealed class DatabaseTable : IDatabaseTable
{
    [ProtoMember(1)] public string Name { get; set; }
    [ProtoMember(2)] public string Path { get; set; }
    [ProtoMember(3)] public string ParentPath { get; set; }
    [ProtoMember(4)] public IEnumerable<DatabaseTableRecord> Records { get; set; }

    public DatabaseTable()
    {
        Records = new List<DatabaseTableRecord>
        {
            Capacity = 0
        };
    }

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