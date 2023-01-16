using FirebaseCoreSDK;
using FirebaseCoreSDK.Configuration;
using FirebaseCoreSDK.Firebase.Auth.ServiceAccounts;

namespace Connection;

public class FirebaseConnection : IConnection<FirebaseClient>
{
    private FirebaseClient? _firebaseClient;

    public FirebaseClient Connect()
    {
        return _firebaseClient ?? CreateNewConnection();
    }

    private FirebaseClient CreateNewConnection()
    {
        var configuration = new FirebaseSDKConfiguration
        {
            Credentials = new JsonServiceAccountCredentials("your-file.json")
        };

        _firebaseClient = new FirebaseClient(configuration);

        return _firebaseClient;
    }

    public bool Disconnect()
    {
        return true;
    }
}