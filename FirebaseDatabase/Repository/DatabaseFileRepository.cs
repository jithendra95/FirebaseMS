﻿using Domain;
using FirebaseDatabase.Utilities;
using FirebaseMS.Utilities;

namespace FirebaseDatabase.Repository;

public class DatabaseFileRepository : IRepository<Database>
{
    private readonly IStorage<IEnumerable<Database>> _storage;
    private readonly string _filePath;

    private IEnumerable<Database> _databases;

    public DatabaseFileRepository(IStorage<IEnumerable<Database>> storage)
    {
        var folderPath = FileStorageUtil.GetDefaultFolderLocation();
        Directory.CreateDirectory(folderPath);

        _filePath = Path.Combine(folderPath, "database.txt");
        _storage = storage;
        _databases = ReadFile();
    }

    public IEnumerable<Database> ReadAll()
    {
        return _databases;
    }

    public bool Save(Database database)
    {
        lock (_databases)
        {
            var databases = _databases.Append(database);
            return _storage.Save(_filePath, false, databases);  
        }
    }

    public Database Read(string id)
    {
        return _databases.First(x => x.Id == id);
    }

    private IEnumerable<Database> ReadFile()
    {
        try
        {
            return _storage.Read(_filePath);
        }
        catch (FileNotFoundException)
        {
            return new List<Database>();
        }
    }
}