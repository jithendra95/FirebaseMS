import {Table} from "./FirebaseRealtimeDb/Models";

export interface IDatabase{
    GetTables(): Promise<Table[]>
}