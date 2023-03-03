import {RealTimeDatabase} from "./RealTimeDatabase";
import {Table} from "./Models";


export class RealtimeDatabaseController {
    private static databases: { [key: string]: RealTimeDatabase } = {};

    public static LoadDatabases(config: { Id: string, PathToCredentials: string, DatabaseUrl: string, DatabaseName: string, }) {
        if (!this.databases[config.Id])
            this.databases[config.Id] = new RealTimeDatabase(config.PathToCredentials, config.DatabaseUrl, config.DatabaseName);

    }

    public static async GetTablesForDatabase(id: string): Promise<Table[]> {
        return this.databases[id] ? this.databases[id].GetTables() : Promise.resolve([]);
    }


}