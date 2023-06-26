import {DatabaseCredentials} from "../FirebaseRealtimeDb/Models";
import {CredentialsRepository} from "./CredentialsRepository";

export class CredentialManager {

    public static CreateCredential(credentials: DatabaseCredentials) {
        CredentialsRepository.CreateCredential(credentials);
    }

    public static async GetCredentials(): Promise<DatabaseCredentials[]> {
        return CredentialsRepository.GetDatabaseCredentials();
    }

    public static async GetCredentialsById(id: string): Promise<DatabaseCredentials> {
        return CredentialsRepository.GetDatabaseCredentialsById(id);
    }

    public static async DeleteCredential(id: string): Promise<boolean> {
        return CredentialsRepository.DeleteCredential(id);
    }
}