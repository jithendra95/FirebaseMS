﻿using ProtoBuf.Grpc.Client;
using RpcContracts.Services;

namespace GrpcClient.ServerConnection;

public class ServerConnectionProvider
{
    private readonly ServerChannelFactory _channelFactory;

    public ServerConnectionProvider(ServerChannelFactory channelFactory)
    {
        _channelFactory = channelFactory;
    }

    public IDatabaseService CreateService()
    {
        return _channelFactory.CreateNewChannel().CreateGrpcService<IDatabaseService>();
    }
}