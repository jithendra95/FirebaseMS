import {database} from "firebase-admin";
import {firebaseApp} from "../firebase-initializer";
import {Table} from "./models";
import {DetectTables} from "./serializer";

export class RealTimeDatabase {
    
    private serviceAccount: string;
    private databaseUrl: string;
    private allTables: Table[] = [];
    private readonly app;
    constructor(serviceAccountPath: string, databaseUrl: string, appName: string) {
        this.serviceAccount = serviceAccountPath;
        this.databaseUrl = databaseUrl
        this.app = firebaseApp(serviceAccountPath, databaseUrl, appName);
    }
    
    public async GetTables(): Promise<Table[]>{
        const db = database(this.app);
        const ref = db.ref('/');

        let snapshot = await ref.once("value");
        let root = snapshot.val();
        DetectTables(root, "",this.allTables, "");
        return Promise.resolve(this.allTables);
    }
}


