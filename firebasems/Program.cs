// See https://aka.ms/new-console-template for more information

using FirestoreDatabase;

Console.WriteLine();
var api = new RealtimeDbApi();

var tables = await api.ReadAll();
var realtimeDbService = new RealtimeDbService(tables);
foreach (var table in realtimeDbService.GetTreeUptoNode("money-easy.categories"))
{
    Console.WriteLine(table.Name);
    if (table.Records.Any())
    {
        var columns = table.Records.First().Columns;
        foreach (var column in columns)
        {
            Console.Write($" {column.Name} |");
        }

        Console.WriteLine();
    }

    foreach (var row in table.Records)
    {
        foreach (var column in row.Columns)
        {
            Console.Write($" {column.Value} |");
        }
        Console.WriteLine();
    }
}