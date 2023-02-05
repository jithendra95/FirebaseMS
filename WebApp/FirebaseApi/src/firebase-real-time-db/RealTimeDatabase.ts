import {database} from "firebase-admin";
import {firebaseApp} from "../firebase-initializer";
import {Table} from "./models";
import {DetectTables} from "./serializer";

export class RealTimeDatabase {
    
    private serviceAccount: string;
    private databaseUrl: string;
    private allTables: Table[] = [];
    
    constructor(serviceAccountPath: string, databaseUrl: string, appName: string) {
        this.serviceAccount = serviceAccountPath;
        this.databaseUrl = databaseUrl
        const app = firebaseApp(serviceAccountPath, databaseUrl, appName);
        const db = database(app);
        const ref = db.ref('/');
        let root: object;
        
        ref.on("value", (snapshot) => {
            root = snapshot.val();
            this.LoadTables(root);
            console.log('The read success');
        }, (errorObject) => {
            console.log('The read failed: ' + errorObject.name);
        });
    }

    private LoadTables(root: object): void{
        DetectTables(root, "",this.allTables, "");
    }
    
    public GetTables(): Table[]{
        return this.allTables;
    }
}


