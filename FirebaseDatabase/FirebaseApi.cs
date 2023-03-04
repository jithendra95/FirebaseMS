using System.Net.Http.Headers;
using Domain;


namespace FirebaseDatabase;

public class FirebaseApi : IDatabaseApi
{
    private readonly HttpClient _client;
    private readonly string _path;
    private readonly Dictionary<string, bool> _hasDatabaseLoaded;

    public FirebaseApi()
    {
        _client = new HttpClient();
        // Update port # in the following line.
        _client.BaseAddress = new Uri("http://localhost:5050/");
        _client.DefaultRequestHeaders.Accept.Clear();
        _client.DefaultRequestHeaders.Accept.Add(
            new MediaTypeWithQualityHeaderValue("application/json"));
        _path = "database";
        _hasDatabaseLoaded = new Dictionary<string, bool>();
    }

    public Database Read(Database database)
    {
        if (!_hasDatabaseLoaded.ContainsKey(database.Id))
        {
            var httpResponseMessage = _client.PostAsJsonAsync(_path, database).Result;
            _hasDatabaseLoaded.Add(database.Id, true);
        }
        
        var databaseTables = new List<DatabaseTable>();
        var response = _client.GetAsync(Path.Combine(_path, database.Id)).Result;
        if (response.IsSuccessStatusCode)
        {
            databaseTables = response.Content.ReadAsAsync<List<DatabaseTable>>().Result;
        }
        database.UnstructuredTables =  databaseTables;

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