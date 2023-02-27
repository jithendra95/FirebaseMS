using Domain;
using ProtoBuf;

namespace RpcContracts.DatabaseMessages;

[ProtoContract]
public class DatabaseCreateMessage
{
    [ProtoMember(1)] public string FileName { get; set; }
    [ProtoMember(2)] public string FileBase64 { get; set; }
    [ProtoMember(3)] public string DatabaseUrl { get; set; }
    [ProtoMember(4)] public DatabaseTypeEnum DatabaseType { get; init; }
}