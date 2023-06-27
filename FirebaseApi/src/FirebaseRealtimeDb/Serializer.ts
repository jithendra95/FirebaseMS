import {Table, TableData, TableRecord} from "./Models";

export function DetectTables(currentNode: any, currentNodeId: string, allTable: Table[], allTableData: TableData[], path: string, databaseId: string, parent?: Table, tableData?: TableData) {

    if (typeof currentNode == "object") {
        let currentNodeKeys = Object.keys(currentNode);
        if (currentNodeKeys.length > 0 && (typeof currentNode[currentNodeKeys[0]] === 'object')) {
            if (path !== "")
                path = path + "." + currentNodeId;
            else
                path = currentNodeId;
            let table = new Table(currentNodeId, path, databaseId)
            let tableData = new TableData(path, databaseId)
            if (typeof parent !== "undefined") {
                table.parentPath = parent.path
            }
            Object.keys(currentNode).map(key => {
                DetectTables(currentNode[key], key, allTable,allTableData, path, databaseId, table, tableData)
            });
            if (!(table.name === "" && table.path === "")){
                table.numberOfRecords = tableData.records.length
                allTable.push(table);
                allTableData.push(tableData)
            }

        } else {
            CreateRecord(currentNode, currentNodeKeys, currentNodeId, parent, tableData);
        }
    }
}

function CreateRecord(currentNode: any, currentNodeKeys: string[], currentNodeId: string, parent?: Table, tableData?: TableData) {
    let record = new TableRecord(currentNodeId);
    let columnsIdentified = (parent?.columns && parent?.columns.length > 0);

    currentNodeKeys.map(key => {
        (typeof currentNode[key] !== "object") ? record.values[key] = currentNode[key] : record.values[key] = JSON.stringify(currentNode[key]);
        if (!columnsIdentified)
            parent?.columns.push(key);
    })
    tableData?.records.push(record);
}

export function DetectRootLevelObjects(rootNode: any, allTables: Table[],allTableData: TableData[], databaseId: string): void {
    if (typeof rootNode == "object") {
        let rootNodeKeys = Object.keys(rootNode);

        rootNodeKeys.map(key => {
            let childNode = rootNode[key];
            let childNodeKeys = Object.keys(childNode);

            if (childNodeKeys.length > 0 && (typeof childNode[childNodeKeys[0]] !== 'object')) {
                let table = new Table(key, key, databaseId);
                let tableData = new TableData(key, databaseId);
                table.parentPath = "";
                CreateRecord(childNode, childNodeKeys, key, table, tableData);
                table.numberOfRecords = tableData.records.length
                allTables.push(table);
                allTableData.push(tableData)
            }
        })
    }
}
