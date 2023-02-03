namespace Domain;


public class DatabaseTableColumn : IDatabaseTableColumn
{
    public string Name { get; set; }
    public ColumnDataType DataType { get; set; }

    public string Value { get; set; }


    public DatabaseTableColumn(string name, ColumnDataType dataType, string value)
    {
        Name = name;
        DataType = dataType;
        Value = value;
    }
}