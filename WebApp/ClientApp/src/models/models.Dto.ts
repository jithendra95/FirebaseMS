export class Table {
    name: string;
    path: string;
    parentPath?: string;
    records: TableRecord[] = []

    constructor(name: string, path: string) {
        this.name = name;
        this.path = path;
    }
}

export class TableRecord {
    columns: TableColumn[] = []
}

export class TableColumn {
    name: string;
    value: string;

    constructor(name: string, value: string) {
        this.name = name;
        this.value = value;
    }
}