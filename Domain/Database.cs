using ProtoBuf;

namespace Domain;
[ProtoContract]
public class Database : IDatabase
{
    [ProtoMember(1)]
    public IEnumerable<DatabaseTable> Tables { get; set; }
  
    public Database(){}
    public Database(IEnumerable<DatabaseTable> tables)
    {
        Tables = tables;
    }

}