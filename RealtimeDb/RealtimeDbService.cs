using Connection;
using Domain;

namespace FirestoreDatabase;

public class RealtimeDbService
{
    private readonly IEnumerable<DatabaseTable> _tables;

    public RealtimeDbService(IEnumerable<DatabaseTable> tables)
    {
        _tables = tables;
    }

    public IEnumerable<DatabaseTable> GetRootTables()
    {
        return _tables.Where(x => x.ParentPath == string.Empty);
    }

    public LinkedList<DatabaseTable> GetTreeUptoNode(string path)
    {
        var tableTree = new LinkedList<DatabaseTable>();
        var child = _tables.First(x => x.Path == path);
        var tableTreeNode = new LinkedListNode<DatabaseTable>(child);
        tableTree.AddFirst(tableTreeNode);

        while (child.ParentPath != string.Empty)
        {
            var nextChild  = _tables.First(x => x.Path == child.ParentPath);
            var nextNode = new LinkedListNode<DatabaseTable>(nextChild);
            tableTree.AddBefore(tableTreeNode, nextNode);

            child = nextChild;
            tableTreeNode = nextNode;
        }

        return tableTree;
    }
}