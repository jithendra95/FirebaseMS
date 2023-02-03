using ProtoBuf;

namespace Domain;
[ProtoContract]
public class DatabaseMessage
{
    [ProtoMember(1)]
    public IEnumerable<DatabaseTableMessage> Tables { get; set; }

}