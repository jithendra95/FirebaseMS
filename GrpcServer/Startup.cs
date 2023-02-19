﻿using System.IO.Compression;
using Domain;
using FirebaseDatabase;
using FirebaseDatabase.Repository;
using FirebaseMS.Utilities;
using GrpcServer;
using GrpcServer.Services;
using GrpcServer.Extensions;
using GrpcService;
using ProtoBuf.Grpc.Server;
using RpcContracts.Services;

namespace GrpcServer
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCodeFirstGrpc(config =>
            {
                config.ResponseCompressionLevel = CompressionLevel.Optimal;
            });
            services.AddCodeFirstGrpcReflection();

            services.AddAuthorization();
            services.AddScoped<IDatabaseApi, RealtimeDbApi>();
            services.AddScoped<IStorage<IEnumerable<Database>>, FileStorage<IEnumerable<Database>>>();
            services.AddScoped<IRepository<Database>,DatabaseFileRepository>();
            
            services.AddScoped<IDatabaseFactory, DatabaseFactory>();
            services.AddSingleton<IDatabaseService, DatabaseService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment _)
        {
            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapGrpcService<DatabaseService>();
                endpoints.MapCodeFirstGrpcReflectionService();
            });
        }
    }
}