namespace Domain;

public class DatabaseTableRecord
{
    public IEnumerable<DatabaseTableColumn> Columns { get; }

    public DatabaseTableRecord(IEnumerable<DatabaseTableColumn> columns)
    {
        Columns = columns;
    }
}