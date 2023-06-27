import {database} from "firebase-admin";
import {firebaseApp} from "../FirebaseInitializer";
import {Table, TableData, TableRecord} from "./Models";
import {DetectRootLevelObjects, DetectTables} from "./Serializer";
import {IDatabase} from "../IDatabase";
import Reference = database.Reference;
import {BuildDatabaseTree} from "./DatabaseTableTreeBuilder";
import Database = database.Database;

export class RealTimeDatabase implements IDatabase {

    private serviceAccount: string;
    private readonly databaseId: string;
    private databaseUrl: string;
    private allTables: Table[] = [];
    private allTableData: TableData[] = [];
    private maxAttempts = 3;
    private dataFetchedOnce = false;
    private listener: any;
    private readonly ref?:  Reference;
    private readonly db?:  Database;
    private readonly app;

    constructor(serviceAccountPath: string, databaseId: string, databaseUrl: string, appName: string) {
        this.serviceAccount = serviceAccountPath;
        this.databaseId = databaseId;
        this.databaseUrl = databaseUrl;
        try {
            this.app = firebaseApp(serviceAccountPath, databaseUrl, appName);
            this.db = database(this.app);
            this.ref = this.db.ref('/');
        } catch {
            this.app = undefined;
        }

    }

    private initializeListener(){
        if(typeof this.ref !== 'undefined')
            this.listener = this.ref.on("value", (snapshot) => {
                let root = snapshot.val();
                this.allTables = []
                this.allTableData = []
                DetectTables(root, "", this.allTables,this.allTableData,"", this.databaseId);
                DetectRootLevelObjects(root, this.allTables,this.allTableData, this.databaseId);
                this.dataFetchedOnce = true
            });
    }
    public async GetTables(attempt? :number): Promise<Table[]> {
        attempt ??= 1;
        if (this.app) {
            if(this.dataFetchedOnce){
                return Promise.resolve(BuildDatabaseTree(this.allTables));
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

    public async GetTableData(path: string): Promise<TableData | undefined>{
        let tableData = this.allTableData.find(x=> x.path === path)
        return Promise.resolve(tableData);
    }

    public async GetRecord(path: string, recordId: string): Promise<TableRecord | undefined>{
        let tableData = this.allTableData.find(x=> x.path === path)
        let tableRecord = tableData?.records.find(x=> x._id === recordId);
        return Promise.resolve(tableRecord);
    }

    public async DeleteRecord(path: string, recordId: string): Promise<boolean>{
        const refToDelete = path.replace(/\./g,'/')+'/'+ recordId;
        await this.db?.ref(refToDelete).remove();
        return Promise.resolve(true);
    }


    public Disconnect(){
        this.ref?.off("value", this.listener);
        this.allTables.splice(0);
        this.dataFetchedOnce = false;
    }

}

const delay = (fn: () => Promise<any>, ms: number) => new Promise((resolve) => setTimeout(() => resolve(fn()), ms));



