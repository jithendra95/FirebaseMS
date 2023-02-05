using System.Xml.Linq;
using Newtonsoft.Json;

namespace FirebaseMS.Utilities;

public class FileStorage<T>: IStorage<T>
{
    public bool Save(string filePath, bool append, T objectToSave)
    {
        TextWriter writer = null;
        try
        {
            var contentsToWriteToFile = JsonConvert.SerializeObject(objectToSave);
            writer = new StreamWriter(filePath, true);
            writer.Write(contentsToWriteToFile);
        }
        finally
        {
            if (writer != null)
                writer.Close();
        }

        return true;
    }

    public T Read(string filePath)
    {
        TextReader reader = null;
        try
        {
            reader = new StreamReader(filePath);
            var fileContents = reader.ReadToEnd();
            return JsonConvert.DeserializeObject<T>(fileContents);
        }
        finally
        {
            if (reader != null)
                reader.Close();
        }
    }
}

public interface IStorage<T>
{
    public bool Save(string filePath, bool append, T objectToSave);

    public T Read(string filePath);
}