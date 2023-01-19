using Grpc.Net.Client;

namespace GrpcClient.ServerConnection;

public class ServerChannelFactory
{
    private GrpcChannel? _channel;

    public GrpcChannel CreateNewChannel()
    {
        return _channel ?? CreateChannel();
    }

    private GrpcChannel CreateChannel()
    {
        _channel = GrpcChannel.ForAddress("http://localhost:10042");
        return _channel;
    }
}