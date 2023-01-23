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

}
