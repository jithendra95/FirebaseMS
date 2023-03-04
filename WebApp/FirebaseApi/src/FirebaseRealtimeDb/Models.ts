
export class Table {
    name: string;
    path: string;
    parentPath?: string;
    records: TableRecord[] = []
    columns: string[] = []

    constructor(name: string, path: string) {
        this.name = name;
        this.path = path;
    }
}
export enum DataBaseTypeEnum{
    firestore,
    realtimeDb
}

export interface DatabaseCredentials{
    Id: string;
    DatabaseName: string;
    PathToCredentials: string;
    DatabaseType: DataBaseTypeEnum
    DatabaseUrl: string;
}

export class TableRecord {
    values: {[key: string]: string} = {}
}
