
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

export class TableRecord {
    values: {[key: string]: string} = {}
}
