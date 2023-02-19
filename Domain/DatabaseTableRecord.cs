namespace Domain;

public class DatabaseTableRecord
{
    public Dictionary<string, string> Values { get; set; }

    public DatabaseTableRecord(Dictionary<string, string> values)
    {
        Values = values;
    }
}