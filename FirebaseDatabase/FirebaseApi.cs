using System.Net.Http.Headers;
using Domain;


namespace FirebaseDatabase;

public class FirebaseApi : IDatabaseApi
{
    private readonly HttpClient _client;
    private readonly string _path;
    private readonly Dictionary<string, bool> _hasDatabaseLoaded;
    private readonly object dataLock = new object();
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

    public IEnumerable<DatabaseTable> Read(Database database)
    {
            if (!_hasDatabaseLoaded.ContainsKey(database.Id))
            {
                var httpResponseMessage = _client.PostAsJsonAsync(_path, database).Result;
                if (!httpResponseMessage.IsSuccessStatusCode)
                {
                    return new List<DatabaseTable>();
                }
                _hasDatabaseLoaded.Add(database.Id, true);   
            }

            var response = _client.GetAsync(Path.Combine(_path, database.Id)).Result;
            return response.IsSuccessStatusCode ? response.Content.ReadAsAsync<List<DatabaseTable>>().Result:  new List<DatabaseTable>();
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
        if (response.IsSuccessStatusCode)
        {
            if (response.Content.ReadAsAsync<bool>().Result)
                _hasDatabaseLoaded.Remove(id);
        }
        return  false;
    }
}