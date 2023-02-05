import {RealTimeDatabase} from "./RealTimeDatabase";
import {Table} from "./models";


export class RealtimeDatabaseController {
    private static databases: { [key: string]: RealTimeDatabase } = {};

    public static LoadDatabases(configs: { id: string, appName: string, serviceAccountPath: string, databaseUrl: string }[]) {
        configs.forEach(config => {
            if(!this.databases[config.id])
                this.databases[config.id] = new RealTimeDatabase(config.serviceAccountPath, config.databaseUrl, config.appName);
        })

    }

    public static GetTablesForDatabase(id: string): Table[] {
        return this.databases[id]?.GetTables();
    }


}