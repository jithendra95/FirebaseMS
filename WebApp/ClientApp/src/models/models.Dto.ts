
export interface DatabaseDto{
    id: string;
    pathToCredentials: string;
    databaseUrl: string;
    databaseName: string;
}
export class DatabaseTableDto {
    name: string;
    path: string;
    parentPath?: string;
    records: TableRecord[] = [];
    columns: string[] = [];
    tables: DatabaseTableDto[] = []

    constructor(name: string, path: string) {
        this.name = name;
        this.path = path;
    }
}

export class TableRecord {
    values: {[key: string]: string} = {}
}

export enum DataBaseTypeEnum{
    firestore,
    realtimeDb
}

export interface DatabaseCredentials{
    filePath: string;
    databaseType: DataBaseTypeEnum
    databaseUrl: string;
}