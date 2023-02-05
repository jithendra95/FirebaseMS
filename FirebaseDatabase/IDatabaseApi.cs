using Domain;

namespace FirebaseDatabase;

public interface IDatabaseApi
{
    public Database Read(Database newObject);
    
    public bool Create(Database newObject);
    
    public bool Update(string id,  Database newDatabase);
    
    public bool Delete(string id);
}