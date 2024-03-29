﻿namespace Domain;


public sealed class DatabaseTable : IDatabaseTable
{
    public string Name { get; set; }
    public string Path { get; set; }
    public string ParentPath { get; set; }
    public string DatabaseId { get; set; }
    public IEnumerable<DatabaseTableRecord> Records { get; set; }
    
    public IEnumerable<string> Columns { get; set; }
    public IEnumerable<DatabaseTable> Tables { get; set; }


    public DatabaseTable(string name,
        string path,
        IEnumerable<string> columns,
        IEnumerable<DatabaseTableRecord> records, IEnumerable<DatabaseTable> tables,string parentPath, string databaseId)
    {
        Name = name;
        Path = path;
        Columns = columns;
        Records = records;
        Tables = tables;
        ParentPath = parentPath;
        DatabaseId = databaseId;
    }
}