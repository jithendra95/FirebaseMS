import {RealTimeDatabase} from "./RealTimeDatabase";
import {DataBaseTypeEnum, Table, TableData} from "./Models";
import {CredentialManager} from "../CredentialManager/CredentialManager";


export class DatabaseController {
    private static databases: { [key: string]: RealTimeDatabase | undefined } = {};

    public static async GetTables(credentialId: string): Promise<Table[]> {
        if(!this.databases[credentialId]) {


            const databaseCredentials = await CredentialManager.GetCredentialsById(credentialId);

            switch (databaseCredentials.databaseType) {
                case DataBaseTypeEnum.realtimeDb:
                    this.databases[credentialId] = new RealTimeDatabase(
                        databaseCredentials.pathToCredentials, databaseCredentials.id,
                        databaseCredentials.databaseUrl, databaseCredentials.databaseName);
                    break;
                case DataBaseTypeEnum.firestore:
                    throw "Not Implemented";
            }
        }
        return this.databases[credentialId]!.GetTables();
    }

    public static async GetTableData(credentialId: string, path: string): Promise<TableData |  undefined> {
        return this.databases[credentialId] ? this.databases[credentialId]?.GetTableData(path): undefined;
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