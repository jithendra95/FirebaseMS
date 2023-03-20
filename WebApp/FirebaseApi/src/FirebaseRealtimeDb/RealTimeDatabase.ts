import {database} from "firebase-admin";
import {firebaseApp} from "../FirebaseInitializer";
import {Table} from "./Models";
import {DetectRootLevelObjects, DetectTables} from "./Serializer";
import {IDatabase} from "../IDatabase";
import Reference = database.Reference;
import {type} from "os";

export class RealTimeDatabase implements IDatabase {

    private serviceAccount: string;
    private databaseId: string;
    private databaseUrl: string;
    private allTables: Table[] = [];
    private maxAttempts = 3;
    private dataFetchedOnce = false;
    private listener: any;
    private ref?:  Reference;
    private readonly app;

    constructor(serviceAccountPath: string, databaseId: string, databaseUrl: string, appName: string) {
        this.serviceAccount = serviceAccountPath;
        this.databaseId = databaseId;
        this.databaseUrl = databaseUrl;
        try {
            this.app = firebaseApp(serviceAccountPath, databaseUrl, appName);
            const db = database(this.app);
            this.ref = db.ref('/');
        } catch {
            this.app = undefined;
        }

    }

    private initializeListener(){
        if(typeof this.ref !== 'undefined')
            this.listener = this.ref.on("value", (snapshot) => {
                let root = snapshot.val();
                this.allTables = []
                DetectTables(root, "", this.allTables,"", this.databaseId);
                DetectRootLevelObjects(root, this.allTables, this.databaseId);
                this.dataFetchedOnce = true
            });
    }
    public async GetTables(attempt? :number): Promise<Table[]> {
        attempt ??= 1;
        if (this.app) {
            if(this.dataFetchedOnce){
                return Promise.resolve(this.allTables);
            }
            else if (attempt <= this.maxAttempts) {
                this.initializeListener()
                return await delay(() => this.GetTables(attempt! + 1), 3 * 1000) as Promise<Table[]>;
            }
            return Promise.resolve([]);
        } else {
            return Promise.resolve([]);
        }
    }
    
    public Disconnect(){
        this.ref?.off("value", this.listener);
        this.allTables.splice(0);
        this.dataFetchedOnce = false;
    }

}

const delay = (fn: () => Promise<any>, ms: number) => new Promise((resolve) => setTimeout(() => resolve(fn()), ms));



