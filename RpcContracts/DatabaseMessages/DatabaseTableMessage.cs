﻿using ProtoBuf;

namespace RpcContracts.DatabaseMessages;

[ProtoContract]
public sealed class DatabaseTableMessage
{
    [ProtoMember(1)] public string Name { get; set; }
    [ProtoMember(2)] public string Path { get; set; }
    [ProtoMember(3)] public string ParentPath { get; set; }
    [ProtoMember(4)] public IEnumerable<DatabaseTableRecordMessage> Records { get; set; }
    [ProtoMember(5)] public IEnumerable<DatabaseTableMessage> Tables { get; set; }
    [ProtoMember(6)] public IEnumerable<string> Columns { get; set; }
    
    [ProtoMember(7)] public string DatabaseId { get; set; }

}