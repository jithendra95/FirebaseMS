namespace Domain.Extensions;

public static class DatabaseTableExtensions
{
    public static IEnumerable<DatabaseTable> ToOriginalTree(this IReadOnlyCollection<DatabaseTable> databaseTables)
    {

        var rootTables =
            databaseTables.Where(table => table.ParentPath == string.Empty && table.Path != string.Empty);

        var originalTree = rootTables as DatabaseTable[] ?? rootTables.ToArray();
        foreach (var table in originalTree)
        {
            AllocateChildTables(table, databaseTables);
        }

        return originalTree;
    }

    private static void AllocateChildTables(DatabaseTable table,
        IReadOnlyCollection<DatabaseTable> databaseTables)
    {
        var childTables = databaseTables.Where(databaseTable => databaseTable.ParentPath == table.Path).ToList();
        table.Tables = childTables;
        foreach (var childTable in childTables)
        {
            AllocateChildTables(childTable, databaseTables);
        }
    }
}