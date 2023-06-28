import {RealTimeDatabase} from "./RealTimeDatabase";
import {DataBaseTypeEnum, Table, TableData, TableRecord} from "./Models";
import {CredentialManager} from "../CredentialManager/CredentialManager";


export class DatabaseController {
    private static databases: { [key: string]: RealTimeDatabase | undefined } = {};

    public static async GetTables(databaseId: string): Promise<Table[]> {
        if (!this.databases[databaseId]) {


            const databaseCredentials = await CredentialManager.GetCredentialsById(databaseId);

            switch (databaseCredentials.databaseType) {
                case DataBaseTypeEnum.realtimeDb:
                    this.databases[databaseId] = new RealTimeDatabase(
                        databaseCredentials.pathToCredentials, databaseCredentials.id,
                        databaseCredentials.databaseUrl, databaseCredentials.databaseName);
                    break;
                case DataBaseTypeEnum.firestore:
                    throw "Not Implemented";
            }
        }
        return this.databases[databaseId]!.GetTables();
    }

    public static async GetTableData(databaseId: string, path: string): Promise<TableData | undefined> {
        return this.databases[databaseId] ? this.databases[databaseId]?.GetTableData(path) : undefined;
    }

    public static async GetRecord(databaseId: string, path: string, recordId: string): Promise<TableRecord | undefined> {
        return this.databases[databaseId] ? this.databases[databaseId]?.GetRecord(path, recordId) : undefined;
    }

    public static async CreateRecord(databaseId: string, path: string, recordId: string | undefined, data: object): Promise<void> {
        if (this.databases[databaseId]) this.databases[databaseId]?.CreateRecord(path, recordId, data);
    }

    public static async DeleteRecord(databaseId: string, path: string, recordId: string): Promise<void> {
        if (this.databases[databaseId]) this.databases[databaseId]?.DeleteRecord(path, recordId);
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