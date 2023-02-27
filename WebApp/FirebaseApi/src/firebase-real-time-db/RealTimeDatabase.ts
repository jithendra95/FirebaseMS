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
        this.databaseUrl = databaseUrl;
        try{
            this.app = firebaseApp(serviceAccountPath, databaseUrl, appName);
        }catch{
            this.app = undefined;
        }
        
    }
    
    public async GetTables(): Promise<Table[]>{
        if(this.app){
            const db = database(this.app);
            const ref = db.ref('/');

            let snapshot = await ref.once("value");
            let root = snapshot.val();
            this.allTables = []
            DetectTables(root, "",this.allTables, "");
            return Promise.resolve(this.allTables); 
        }else{
            return Promise.resolve([]);
        }
        
    }
}


