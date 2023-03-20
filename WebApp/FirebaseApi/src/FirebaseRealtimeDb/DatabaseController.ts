import {RealTimeDatabase} from "./RealTimeDatabase";
import {DatabaseCredentials, DataBaseTypeEnum, Table} from "./Models";


export class DatabaseController {
    private static databases: { [key: string]: RealTimeDatabase | undefined } = {};

    public static LoadDatabases(databaseCredentials: DatabaseCredentials) {
        if (!this.databases[databaseCredentials.Id]) {
            switch (databaseCredentials.DatabaseType) {
                case DataBaseTypeEnum.realtimeDb:
                    this.databases[databaseCredentials.Id] = new RealTimeDatabase(
                        databaseCredentials.PathToCredentials, databaseCredentials.Id,
                        databaseCredentials.DatabaseUrl, databaseCredentials.DatabaseName);
                    console.log(this.databases)
                    break;
                case DataBaseTypeEnum.firestore:
                    throw "Not Implemented";
            }
        }
    }

    public static async GetTablesForDatabase(id: string): Promise<Table[]> {
        return this.databases[id] ? this.databases[id]!.GetTables() : Promise.resolve([]);
    }

    public static DisconnectDatabase(id: string): boolean {
        let database = this.databases[id];
        console.log(id)
        if (database) {
            database.Disconnect();
            console.log(this.databases)
            return true;
        }
        return false;
    }


}