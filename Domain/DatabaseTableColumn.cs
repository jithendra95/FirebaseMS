namespace Domain;

public  class DatabaseTableColumn : IDatabaseTableColumn
{
    public string Name { get; }
    public ColumnDataType DataType { get; }

    public DatabaseTableColumn(string name, ColumnDataType dataType)
    {
        Name = name;
        DataType = dataType;
    }
}