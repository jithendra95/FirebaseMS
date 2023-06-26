import {DatabaseCredentials} from "../FirebaseRealtimeDb/Models";
import {CredentialsDatabase} from "./CredentialsDatabase";
import {v4 as uuidv4} from 'uuid';

export class CredentialsRepository {
    public static GetDatabaseCredentials(): Promise<DatabaseCredentials[]> {
        return new Promise((resolve, reject) => {
            const database = CredentialsDatabase.Database();
            database.all(`SELECT * FROM credentials`, (error: Error, result: DatabaseCredentials[]) => {
                if (error) {
                    reject(error.message)
                }
                resolve(result)
            });
        })

    }

    public static GetDatabaseCredentialsById(id: string): Promise<DatabaseCredentials> {
        return new Promise((resolve, reject) => {
            const database = CredentialsDatabase.Database();
            const statement = database.prepare(`SELECT * FROM credentials where id = ?`);

            statement.get([id], (error: Error, result: DatabaseCredentials) => {
                if (error) {
                    reject(error.message)
                }
                resolve(result)
            });
        })
    }

    public static CreateCredential(credential: DatabaseCredentials): void {
        const connection = CredentialsDatabase.Database();
        connection.run(`INSERT INTO credentials (id, databaseName, pathToCredentials, databaseUrl,databaseType) VALUES (?, ?, ?, ?, ?)`,
            [uuidv4(), credential.databaseName, credential.pathToCredentials, credential.databaseUrl, credential.databaseType],
            function (error: Error) {
                if (error) {
                    console.error(error.message);
                }
            })
    }

    public static DeleteCredential(id: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const database = CredentialsDatabase.Database();
            const statement = database.prepare(`DELETE FROM credentials where id = ?`);

            statement.run([id], (error: Error) => {
                if (error) {
                    reject(error.message)
                }
                resolve(true)
            });
        })
    }
}