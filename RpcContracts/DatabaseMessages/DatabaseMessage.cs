using Domain;
using ProtoBuf;

namespace RpcContracts.DatabaseMessages;

[ProtoContract]
public class DatabaseMessage
{
    [ProtoMember(1)] public string Id { get; init; }
    [ProtoMember(2)] public string PathToCredentials { get; init; }
    [ProtoMember(3)] public string DatabaseUrl { get; init; }
    [ProtoMember(4)] public string DatabaseName { get; init; }
    [ProtoMember(5)] public DatabaseTypeEnum DatabaseType { get; init; }
    [ProtoMember(6)] public IEnumerable<DatabaseTableMessage> Tables { get; init; }
}