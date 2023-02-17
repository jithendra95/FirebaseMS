import React from "react";
import {Table} from "../models/models.Dto";
import Accordion from 'react-bootstrap/Accordion';
import {DatabaseTableRecord} from "./DatabaseTableRecord";

export interface DatabaseTableProps {
    table: Table
}

export const DatabaseTable: React.FunctionComponent<DatabaseTableProps> = ({table}) => {
    return (<Accordion.Item eventKey="0">
        <Accordion.Header>{table?.name}</Accordion.Header>
        <Accordion.Body>
            {(table?.tables !== null && table?.tables) ? table.tables.map(x => {
                return (<DatabaseTable table={x}/>)
            }): []}
            {(table?.records !== null && table?.records) ? table.records.map(x => {
                return (x.columns.find(x => x.name == '_id')?.value ?
                    <DatabaseTableRecord recordId={x.columns.find(x => x.name == '_id')!.value}/> : [])
            }): []}
        </Accordion.Body>
    </Accordion.Item>);
}