namespace Connection;

public interface IConnection<T>
{
    public T Connect();

    public bool Disconnect();
}