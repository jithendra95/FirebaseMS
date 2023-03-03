import {Table, TableRecord} from "./Models";

export function DetectTables(currentNode: any, currentNodeId: string, allTable: Table[], path: string, parent?: Table) {

    if (typeof currentNode == "object") {
        let currentNodeKeys = Object.keys(currentNode);
        if (currentNodeKeys.length > 0 && (typeof currentNode[currentNodeKeys[0]] === 'object')) {
            if (path !== "")
                path = path + "." + currentNodeId;
            else
                path = currentNodeId;
            let table = new Table(currentNodeId, path)
            if (typeof parent !== "undefined") {
                table.parentPath = parent.path
            }
            Object.keys(currentNode).map(key => {
                DetectTables(currentNode[key], key, allTable, path, table)
            });
            if (!(table.name === "" && table.path === ""))
                allTable.push(table);
        } else {
            CreateRecord(currentNode, currentNodeKeys, currentNodeId, parent);
        }
    }


}

function CreateRecord(currentNode: any, currentNodeKeys: string[], currentNodeId: string, parent?: Table) {
    let record = new TableRecord();
    let columnsIdentified = (parent?.columns && parent?.columns.length > 0);
    if (!columnsIdentified) {
        parent?.columns.push("_id");
    }
    record.values["_id"] = currentNodeId;

    currentNodeKeys.map(key => {
        (typeof currentNode[key] !== "object") ? record.values[key] = currentNode[key] : record.values[key] = JSON.stringify(currentNode[key]);
        if (!columnsIdentified)
            parent?.columns.push(key);
    })
    parent?.records.push(record);
}

export function DetectRootLevelObjects(rootNode: any, allTables: Table[]): void {
    if (typeof rootNode == "object") {
        let rootNodeKeys = Object.keys(rootNode);
       
        rootNodeKeys.map(key => {
            let childNode = rootNode[key];
            let childNodeKeys = Object.keys(childNode);
           
            if(childNodeKeys.length > 0 && (typeof childNode[childNodeKeys[0]] !== 'object')){
                let table = new Table(key, key);
                table.parentPath = "";
                CreateRecord(childNode, childNodeKeys, key, table);
                allTables.push(table);
            }
        })
    }
}
