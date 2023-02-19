using ProtoBuf;

namespace RpcContracts.DatabaseMessages;

[ProtoContract]
public class DatabaseTableRecordMessage
{
    [ProtoMember(1)] public Dictionary<string, string> Values { get; set; }
    
}