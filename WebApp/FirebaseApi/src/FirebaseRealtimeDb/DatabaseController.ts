import {RealTimeDatabase} from "./RealTimeDatabase";
import {DatabaseCredentials, DataBaseTypeEnum, Table} from "./Models";


export class DatabaseController {
    private static databases: { [key: string]: RealTimeDatabase } = {};

    public static LoadDatabases(databaseCredentials: DatabaseCredentials) {
        console.log(databaseCredentials)
        if (!this.databases[databaseCredentials.Id]) {
            switch (databaseCredentials.DatabaseType) {
                case DataBaseTypeEnum.realtimeDb:
                    this.databases[databaseCredentials.Id] = new RealTimeDatabase(databaseCredentials.PathToCredentials, databaseCredentials.DatabaseUrl, databaseCredentials.DatabaseName);
                    break;
                case DataBaseTypeEnum.firestore:
                    throw "Not Implemented";
            }
        }
    }

    public static async GetTablesForDatabase(id: string): Promise<Table[]> {
        return this.databases[id] ? this.databases[id].GetTables() : Promise.resolve([]);
    }

    public static DisconnectDatabase(id: string): boolean {
        let database = this.databases[id];
        if (database) {
            database.Disconnect();
            delete this.databases[id];
            return true;
        }
        return false;
    }


}