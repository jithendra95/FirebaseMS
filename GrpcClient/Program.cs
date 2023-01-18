// See https://aka.ms/new-console-template for more information

using Grpc.Net.Client;
using GrpcClient;
using GrpcService.Services;
using ProtoBuf.Grpc.Client;

Console.WriteLine("Hello, World!");

// using var channel = GrpcChannel.ForAddress("https://localhost:7037");
// var client = new Greeter.GreeterClient(channel);
// var reply = await client.SayHelloAsync(
//     new HelloRequest { Name = "GreeterClient" });
// Console.WriteLine("Greeting: " + reply.Message);
// Console.WriteLine("Press any key to exit...");
// Console.ReadKey();

GrpcClientFactory.AllowUnencryptedHttp2 = true;
using (var channel = GrpcChannel.ForAddress("http://localhost:10042"))
{
    var databaseService = channel.CreateGrpcService<IDatabaseService>();
    var result =  await  databaseService.GetDatabase();
    foreach (var table in result.Tables)
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
}