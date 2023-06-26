import {Database} from "sqlite3";

const filepath = "./credentials.db";
const fs = require("fs");

export class CredentialsDatabase{

    private static database: Database;

    public static Database(){
        if(!this.database) {
            if (fs.existsSync(filepath)) {
                this.database = new Database(filepath);
            } else {
                this.database = new Database(filepath, (error: Error | null) => {
                    if (error) {
                        return console.error(error.message);
                    }
                    this.CreateTables();
                });
                console.log("Connection with SQLite has been established");
            }
        }
        return this.database;
    }

    private static CreateTables(){
            this.database.exec(`
                          CREATE TABLE credentials
                          (
                            id VARCHAR(50) PRIMARY KEY,
                            databaseName   VARCHAR(255) NOT NULL,
                            pathToCredentials   VARCHAR(1000) NOT NULL,
                            databaseUrl   VARCHAR(500) NOT NULL,
                            databaseType INTEGER NOT NULL
                          );
                    `);
        }
}