using System.Data;
using Domain;
using FirebaseDatabase.Repository;
using FirebaseDatabase.Utilities;

namespace FirebaseDatabase;

public class DatabaseRepository : IDatabaseRepository
{
    private readonly IDatabaseApi _api;
    private readonly IRepository<Database> _databaseStorageRepository;

    public DatabaseRepository(IDatabaseApi api, IRepository<Database> databaseStorageRepository)
    {
        _api = api;
        _databaseStorageRepository = databaseStorageRepository;
    }

    public Database CreateDatabase(string databaseUrl, DatabaseTypeEnum databaseType, string fileName,
        string base64File)
    {
        var filePath = Path.Combine(FileStorageUtil.GetDefaultFolderLocation(), fileName);
        File.WriteAllBytes(filePath, Convert.FromBase64String(base64File));

        var id = $"{fileName}_{Guid.NewGuid():N}";
        var newDatabase = new Database(id, filePath, databaseUrl, new List<DatabaseTable>(), databaseType,
            fileName);
        if (_databaseStorageRepository.Save(newDatabase))
        {
            return newDatabase;
        }

        throw new DataException();
    }

    public Database GetDatabase(string id)
    {
        var database = _databaseStorageRepository.Read(id);
        try
        {
            return database.DatabaseType switch
            {
                DatabaseTypeEnum.Realtimedb => _api.Read(database),
                DatabaseTypeEnum.Firestore => throw new NotImplementedException(),
                _ => throw new InvalidDataException()
            };
        }
        catch
        {
            return database;
        }
    }

    public IEnumerable<Database> GetAllDatabases()
    {
        return _databaseStorageRepository.ReadAll();
    }
}