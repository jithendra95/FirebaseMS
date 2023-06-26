import {RealTimeDatabase} from "./RealTimeDatabase";
import {DataBaseTypeEnum, Table} from "./Models";
import {CredentialManager} from "../CredentialManager/CredentialManager";


export class DatabaseController {
    private static databases: { [key: string]: RealTimeDatabase | undefined } = {};

    public static async LoadDatabases(credentialId: string) {
        if (!this.databases[credentialId]) {
            const databaseCredentials = await CredentialManager.GetCredentialsById(credentialId);
            
            switch (databaseCredentials.databaseType) {
                case DataBaseTypeEnum.realtimeDb:
                    console.log(databaseCredentials)
                    this.databases[credentialId] = new RealTimeDatabase(
                        databaseCredentials.pathToCredentials, databaseCredentials.id,
                        databaseCredentials.databaseUrl, databaseCredentials.databaseName);
                    break;
                case DataBaseTypeEnum.firestore:
                    throw "Not Implemented";
            }
        }
    }

    public static async GetTablesForDatabase(id: string): Promise<Table[]> {
        console.log(this.databases)
        return this.databases[id] ? this.databases[id]!.GetTables() : Promise.resolve([]);
    }

    public static DisconnectDatabase(id: string): boolean {
        let database = this.databases[id];
        if (database) {
            database.Disconnect();
            return true;
        }
        return false;
    }


}