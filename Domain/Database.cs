namespace Domain;

public class Database : IDatabase
{
    public IEnumerable<IDatabaseTable> Tables { get; }

    public Database(IEnumerable<IDatabaseTable> tables)
    {
        Tables = tables;
    }

}