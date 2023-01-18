using ProtoBuf;

namespace Domain;

[ProtoContract]
public class DatabaseTableRecord
{
    [ProtoMember(1)] public IEnumerable<DatabaseTableColumn> Columns { get; set; }

    public DatabaseTableRecord()
    {
        Columns = new List<DatabaseTableColumn>
        {
            Capacity = 0
        };
    }

    public DatabaseTableRecord(IEnumerable<DatabaseTableColumn> columns)
    {
        Columns = columns;
    }
}