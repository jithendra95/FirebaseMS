import {Table} from "./models";
import {DetectTables} from "./serializer";

export class RealtimeDbService{
    static allTables: Table[] = [];

    static LoadTables(root: object): void{
         DetectTables(root, "",this.allTables, "");
    }

    static GetAllTables(): Table[]{
        return this.allTables;
    }

    static GetRootTables(): Table[]{
        return this.allTables.filter(x=> x.parentPath === "");
    }

    static GetTableTreeUpToNode(path: string): Table | undefined{
        let baseTable = this.allTables.find(x=> x.path === path);
        return baseTable;
    }
}
