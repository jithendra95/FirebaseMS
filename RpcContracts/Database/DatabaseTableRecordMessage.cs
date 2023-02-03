using ProtoBuf;

namespace Domain;

[ProtoContract]
public class DatabaseTableRecordMessage
{
    [ProtoMember(1)] public IEnumerable<DatabaseTableColumnMessage> Columns { get; set; }
    
}