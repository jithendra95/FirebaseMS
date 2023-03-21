using System.Net.Http.Headers;
using Domain;

namespace FirebaseDatabase;

public class FirebaseApi : IDatabaseApi
{
    private readonly HttpClient _client;
    private readonly string _path;

    public FirebaseApi()
    {
        _client = new HttpClient();
        // Update port # in the following line.
        _client.BaseAddress = new Uri("http://localhost:5050/");
        _client.DefaultRequestHeaders.Accept.Clear();
        _client.DefaultRequestHeaders.Accept.Add(
            new MediaTypeWithQualityHeaderValue("application/json"));
        _path = "database";
    }

    public IEnumerable<DatabaseTable> Read(string databaseId)
    {
        var response = _client.GetAsync(Path.Combine(_path, databaseId)).Result;
        return response.IsSuccessStatusCode
            ? response.Content.ReadAsAsync<List<DatabaseTable>>().Result
            : new List<DatabaseTable>();
    }

    public bool Load(Database database)
    {
        var httpResponseMessage = _client.PostAsJsonAsync(_path, database).Result;
        return httpResponseMessage.IsSuccessStatusCode;
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
        var response = _client.DeleteAsync(Path.Combine(_path, id)).Result;
        return response.IsSuccessStatusCode;
    }
}