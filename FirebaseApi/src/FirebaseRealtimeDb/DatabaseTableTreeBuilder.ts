import {Table} from "./Models";

export const BuildDatabaseTree = (allTables: Table[]): Table[]=>{
    const rootTables = allTables.filter(x=> x.parentPath === "" && x.path !== "");
    for(let table of rootTables){
        AllocateChildTable(table, allTables)
    }
    return rootTables;
}

const AllocateChildTable = (parentTable: Table, allTables: Table[]) => {
    let childTables = allTables.filter(x=> x.parentPath === parentTable.path);
    parentTable.childTables = childTables;

    for(let table of childTables){
        AllocateChildTable(table, allTables)
    }
}