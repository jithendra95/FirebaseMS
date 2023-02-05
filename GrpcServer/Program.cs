using Domain;
using FirebaseDatabase.Repository;
using FirebaseMS.Utilities;
using GrpcServer;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Server.Kestrel.Core;

// var storage = new FileStorage<IEnumerable<Database>>();
// var databaseRepo = new DatabaseFileRepository(storage);
// var database = new Database("1",
//     "C:\\Users\\Jithendra.Thenuwara\\Downloads\\super-pass-64e2b-firebase-adminsdk-7zxq2-61f3d182fe.json",
//     "https://super-pass-64e2b-default-rtdb.europe-west1.firebasedatabase.app", new List<DatabaseTable>(),
//     DatabaseTypeEnum.realtimedb);
//
// databaseRepo.Save(database);
//
CreateHostBuilder(args).Build().Run();


static IWebHostBuilder CreateHostBuilder(string[] args) =>
    WebHost.CreateDefaultBuilder(args)
        .ConfigureKestrel(options =>
        {
            options.ListenLocalhost(10042, listenOptions => { listenOptions.Protocols = HttpProtocols.Http2; });
        })
        .UseStartup<Startup>();