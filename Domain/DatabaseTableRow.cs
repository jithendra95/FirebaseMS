namespace Domain;

public class DatabaseTableRow
{
    public IDictionary<IDatabaseTableColumn, string> Data { get; }

    public DatabaseTableRow(IDictionary<IDatabaseTableColumn, string> data)
    {
        Data = data;
    }
}