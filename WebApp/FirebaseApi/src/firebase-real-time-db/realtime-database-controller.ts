import {RealTimeDatabase} from "./RealTimeDatabase";
import {Table} from "./models";


export class RealtimeDatabaseController {
    private static databases: { [key: string]: RealTimeDatabase } = {};

    public static LoadDatabases(config: { Id: string,  PathToCredentials: string, DatabaseUrl: string, DatabaseName: string, }) {
        if (!this.databases[config.Id])
            this.databases[config.Id] = new RealTimeDatabase(config.PathToCredentials, config.DatabaseUrl, config.DatabaseName);

    }

    public static GetTablesForDatabase(id: string): Table[] {
        return this.databases[id]?.GetTables();
    }


}