using Domain;
using RpcContracts.DatabaseMessages;

namespace RpcContracts.Extensions;

public static class DatabaseExtensions
{
    public static DatabaseMessage ToMessage(this Database database)
    {
        return new DatabaseMessage()
        {
            Id = database.Id,
            DatabaseUrl = database.DatabaseUrl,
            PathToCredentials = database.PathToCredentials,
            DatabaseType = database.DatabaseType,
            DatabaseName = database.DatabaseName
        };
    }

    public static DatabaseMessage ToMessage(this Database database, IEnumerable<DatabaseTable> databaseTable)
    {
        return new DatabaseMessage()
        {
            Id = database.Id,
            DatabaseUrl = database.DatabaseUrl,
            PathToCredentials = database.PathToCredentials,
            DatabaseType = database.DatabaseType,
            DatabaseName = database.DatabaseName,
            Tables = databaseTable.Select(x => ToMessage(x, false))
        };
    }

    public static Database ToDatabase(this DatabaseMessage database)
    {
        return new Database(
            database.Id,
            database.PathToCredentials,
            database.DatabaseUrl,
            database.DatabaseType,
            database.DatabaseName
        );
    }

    public static DatabaseTableMessage ToMessage(this DatabaseTable databaseTable, bool attachRecords)
    {
        return new DatabaseTableMessage()
        {
            Name = databaseTable.Name,
            Path = databaseTable.Path,
            Records = attachRecords ? databaseTable.Records.Select(ToMessage) : new List<DatabaseTableRecordMessage>(),
            Tables = databaseTable.Tables != null
                ? databaseTable.Tables.Select(x => ToMessage(x, attachRecords))
                : new List<DatabaseTableMessage>(),
            Columns = databaseTable.Columns.Select(column => column),
            ParentPath = databaseTable.ParentPath
        };
    }

    private static DatabaseTableRecordMessage ToMessage(this DatabaseTableRecord databaseTableRecord)
    {
        return new DatabaseTableRecordMessage()
        {
            Values = databaseTableRecord.Values
        };
    }

    private static DatabaseTableColumnMessage ToMessage(this DatabaseTableColumn databaseTableColumn)
    {
        return new DatabaseTableColumnMessage()
        {
            Name = databaseTableColumn.Name,
            Value = databaseTableColumn.Value,
            DataType = databaseTableColumn.DataType
        };
    }
}