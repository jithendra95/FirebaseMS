namespace Domain;

public  class DatabaseTableColumn : IDatabaseTableColumn
{
    public string Name { get; }
    public ColumnDataType DataType { get; }

    public string Value { get; }
    public DatabaseTableColumn(string name, ColumnDataType dataType, string value)
    {
        Name = name;
        DataType = dataType;
        Value = value;
    }
}