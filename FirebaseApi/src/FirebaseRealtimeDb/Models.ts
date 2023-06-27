export class Table {
    databaseId: string;
    name: string;
    path: string;
    parentPath?: string;
    columns: string[] = [];
    numberOfRecords: number = 0;
    childTables: Table[] = []

    constructor(name: string, path: string, databaseId: string) {
        this.name = name;
        this.path = path;
        this.databaseId = databaseId;
    }
}

export class TableData {
    databaseId: string;
    path: string;
    records: TableRecord[] = []

    constructor(path: string, databaseId: string) {
        this.path = path;
        this.databaseId = databaseId;
    }
}

export enum DataBaseTypeEnum {
    firestore,
    realtimeDb
}

export interface DatabaseCredentials {
    id: string;
    databaseName: string;
    pathToCredentials: string;
    databaseType: DataBaseTypeEnum
    databaseUrl: string;
}

export class TableRecord {
    _id: string;
    values: { [key: string]: string } = {}

    constructor(id: string) {
        this._id = id;
    }
}
