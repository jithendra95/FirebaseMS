using Domain;
using ProtoBuf;

namespace RpcContracts.DatabaseMessages;

[ProtoContract]
public class DatabaseTableColumnMessage
{
    [ProtoMember(1)] public string Name { get; init;}
    [ProtoMember(2)]public string Value { get; init; }
    [ProtoMember(3)] public ColumnDataType DataType { get; init;}

}