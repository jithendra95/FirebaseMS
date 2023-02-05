namespace Domain;


public class DatabaseTableRecord
{
    public IEnumerable<DatabaseTableColumn> Columns { get; set; }

    public DatabaseTableRecord(IEnumerable<DatabaseTableColumn> columns)
    {
        Columns = columns;
    }
}