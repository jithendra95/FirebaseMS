using System.Net.Http.Headers;
using Connection;
using Domain;

namespace FirebaseDatabase;

public class RealtimeDbApi : IDatabaseApi<Database>
{
    private HttpClient _client;
    private string _path;

    public RealtimeDbApi()
    {
        _client = new HttpClient();
        // Update port # in the following line.
        _client.BaseAddress = new Uri("http://localhost:5050/");
        _client.DefaultRequestHeaders.Accept.Clear();
        _client.DefaultRequestHeaders.Accept.Add(
            new MediaTypeWithQualityHeaderValue("application/json"));
        _path = "realtimeDb";
    }

    public Database Read(Domain.Database database)
    {
        var databaseTables = new List<DatabaseTable>();
        var response = _client.GetAsync(_path).Result;
        if (response.IsSuccessStatusCode)
        {
            databaseTables = response.Content.ReadAsAsync<List<DatabaseTable>>().Result;
        }
        database.Tables =  databaseTables;

        return database;
    }

    public bool Create(Database newObject)
    {
        throw new NotImplementedException();
    }

    public bool Update(string id, Database newObject)
    {
        throw new NotImplementedException();
    }


    public bool Delete(string id)
    {
        throw new NotImplementedException();
    }
}