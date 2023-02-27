namespace FirebaseDatabase.Utilities;

public static class FileStorageUtil
{
    public static string GetDefaultFolderLocation()
    {
        var programDataFolder = Environment.GetFolderPath(Environment.SpecialFolder.CommonApplicationData);
       return Path.Combine(programDataFolder, "FirebaseMS");
    }
}