import {Table, TableColumn, TableRecord} from "./models";

export function DetectTables(currentNode: any, currentNodeKey: string, allTable: Table[], path: string, parent?: Table) {
    allTable.splice(0, allTable.length-1);
    if (typeof currentNode == "object") {
        let currentNodeKeys = Object.keys(currentNode);
        if (currentNodeKeys.length > 0 && (typeof currentNode[currentNodeKeys[0]] === 'object')) {
            if(path !== "")
                path = path +"."+currentNodeKey;
            else
                path = currentNodeKey;
            let table = new Table(currentNodeKey, path)
            if (typeof parent !== "undefined") {
                table.parentPath = parent.path
            }
            Object.keys(currentNode).map(key => {
                DetectTables(currentNode[key], key, allTable, path, table)
            });
            if(!(table.name === "" && table.path === ""))
                allTable.push(table);
        }else{
            let record = new TableRecord();
            record.columns.push(new TableColumn("_id", currentNodeKey));
            currentNodeKeys.map(key=>{
                record.columns.push(new TableColumn(key, currentNode[key]));
            })
            parent?.records.push(record);
        }
    }
}