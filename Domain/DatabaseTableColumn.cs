using ProtoBuf;

namespace Domain;

[ProtoContract]
public class DatabaseTableColumn : IDatabaseTableColumn
{
    [ProtoMember(1)] public string Name { get; set;}
    [ProtoMember(2)] public ColumnDataType DataType { get; set;}

    [ProtoMember(3)] public string Value { get; set;}

    public DatabaseTableColumn(){}
    public DatabaseTableColumn(string name, ColumnDataType dataType, string value)
    {
        Name = name;
        DataType = dataType;
        Value = value;
    }
}