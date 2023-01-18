using Connection;
using Domain;

namespace FirestoreDatabase;

public class RealtimeDbService
{
    private readonly Database _database;

    public RealtimeDbService(IEnumerable<DatabaseTable> table)
    {
        _database = new Database(table);
    }

    public IEnumerable<DatabaseTable> GetRootTables()
    {
        return _database.Tables.Where(x => x.ParentPath == string.Empty);
    }

    public LinkedList<DatabaseTable> GetTreeUptoNode(string path)
    {
        var tableTree = new LinkedList<DatabaseTable>();
        var child = _database.Tables.First(x => x.Path == path);
        var tableTreeNode = new LinkedListNode<DatabaseTable>(child);
        tableTree.AddFirst(tableTreeNode);

        while (child.ParentPath != string.Empty)
        {
            var nextChild  = _database.Tables.First(x => x.Path == child.ParentPath);
            var nextNode = new LinkedListNode<DatabaseTable>(nextChild);
            tableTree.AddBefore(tableTreeNode, nextNode);

            child = nextChild;
            tableTreeNode = nextNode;
        }

        return tableTree;
    }
}