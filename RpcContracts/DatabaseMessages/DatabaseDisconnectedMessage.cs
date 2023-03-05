using ProtoBuf;

namespace RpcContracts.DatabaseMessages;

[ProtoContract]
public class DatabaseDisconnectedMessage
{
    [ProtoMember(1)] public bool IsDisconnected { get; init; }
}