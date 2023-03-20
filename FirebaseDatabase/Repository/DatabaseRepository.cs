using System.Data;
using Domain;
using FirebaseDatabase.Utilities;
using Microsoft.Extensions.Logging;

namespace FirebaseDatabase.Repository;

public class DatabaseRepository : IDatabaseRepository
{
    private readonly IDatabaseApi _api;
    private readonly IRepository<Database> _databaseStorageRepository;
    private readonly ILogger<DatabaseRepository> _logger;

    public Dictionary<string, bool> _connectedDatabases;
    public DatabaseRepository(IDatabaseApi api, IRepository<Database> databaseStorageRepository,
        ILogger<DatabaseRepository> logger)
    {
        _api = api;
        _databaseStorageRepository = databaseStorageRepository;
        _logger = logger;
        _connectedDatabases = new Dictionary<string, bool>();
    }

    public Database CreateDatabase(string databaseUrl, DatabaseTypeEnum databaseType, string fileName,
        string base64File)
    {
        var filePath = Path.Combine(FileStorageUtil.GetDefaultFolderLocation(), fileName);
        File.WriteAllBytes(filePath, Convert.FromBase64String(base64File));

        var id = $"{Guid.NewGuid():N}";
        var databaseName = fileName.Split("-firebase")[0];
        var newDatabase = new Database(id, filePath, databaseUrl, databaseType,
            databaseName);
        if (_databaseStorageRepository.Save(newDatabase))
        {
            return newDatabase;
        }

        throw new DataException();
    }

    
    public Database GetDatabase(string id)
    {
        return _databaseStorageRepository.Read(id);
    }

    public Database ConnectDatabase(string id)
    {
        if (!_connectedDatabases.ContainsKey(id))
        {
            _connectedDatabases.Add(id, true);
        }
        return GetDatabase(id);
    }

    public bool DisconnectDatabase(string id)
    {
        try
        {
            if (!_connectedDatabases.ContainsKey(id))
            {
                _connectedDatabases.Remove(id);
            }
            return _api.Delete(id); 
        }catch (Exception e)
        {
            _logger.LogError(e.ToString());
            return false;
        }
        
    }

    public IEnumerable<Database> GetAllDatabases()
    {
        return _databaseStorageRepository.ReadAll();
    }
}