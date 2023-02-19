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
            DatabaseName = database.DatabaseName,
            Tables = database.Tables.Select(ToMessage),
        };
    }

    private static DatabaseTableMessage ToMessage(this DatabaseTable databaseTable)
    {
        return new DatabaseTableMessage()
        {
            Name = databaseTable.Name,
            Path = databaseTable.Path,
            Records = databaseTable.Records.Select(ToMessage),
            Tables = databaseTable.Tables.Select(ToMessage),
            Columns = databaseTable.Columns.Select(column=> column),
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