using GrpcServer;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Server.Kestrel.Core;

CreateHostBuilder(args).Build().Run();

static IWebHostBuilder CreateHostBuilder(string[] args) =>
    WebHost.CreateDefaultBuilder(args)
        .ConfigureKestrel(options =>
        {
            options.ListenLocalhost(10042, listenOptions => { listenOptions.Protocols = HttpProtocols.Http2; });
        })
        .UseStartup<Startup>();