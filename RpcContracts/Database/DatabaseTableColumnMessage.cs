using ProtoBuf;

namespace Domain;

[ProtoContract]
public class DatabaseTableColumnMessage
{
    [ProtoMember(1)] public string Name { get; set;}
    [ProtoMember(2)] public ColumnDataType DataType { get; set;}

}