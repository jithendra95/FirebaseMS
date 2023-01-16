namespace Domain;

public sealed class DatabaseTable : IDatabaseTable
{
    public IEnumerable<IDatabaseTableColumn> Columns { get; }
    public IEnumerable<IDatabaseTableRow> Rows { get; }

    public DatabaseTable(IEnumerable<IDatabaseTableColumn> columns,
        IEnumerable<IDatabaseTableRow> rows)
    {
        Columns = columns;
        Rows = rows;
    }

  
}