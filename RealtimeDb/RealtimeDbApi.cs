using System.Net.Http.Headers;
using System.Net.Http.Json;
using Connection;
using Domain;

namespace FirestoreDatabase;

public class RealtimeDbApi : IDatabaseApi<DatabaseTable>
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

    public DatabaseTable Read(string id)
    {
        throw new NotImplementedException();
    }

    public async Task<IEnumerable<DatabaseTable>> ReadAll()
    {
        var databaseTables = new List<DatabaseTable>();
        var response = await _client.GetAsync(_path);
        if (response.IsSuccessStatusCode)
        {
            databaseTables = await response.Content.ReadAsAsync<List<DatabaseTable>>();
        }
        return databaseTables;
    }

    public bool Create(DatabaseTable newObject)
    {
        throw new NotImplementedException();
    }

    public bool Update(string id, DatabaseTable newObject)
    {
        throw new NotImplementedException();
    }


    public bool Delete(string id)
    {
        throw new NotImplementedException();
    }
}