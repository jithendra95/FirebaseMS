import React from "react";
import {Table} from "../models/models.Dto";
import Accordion from 'react-bootstrap/Accordion';
import {DatabaseTable} from "./DatabaseTable";

export interface DatabaseTreeProps {
    tables: Table[]
}

export const DatabaseTree: React.FunctionComponent<DatabaseTreeProps> = ({tables}) => {
    // return (<div>
    //     {tables.map(table => {
    //         return (<div>
    //             <div>{table.name}</div>
    //             {table.records?.map(record => {
    //                 return <div>{record.columns.find(x=> x.name == '_id')?.value}</div>
    //             })}
    //             {table.tables && <DatabaseTree tables={table.tables}/>}
    //         </div>);
    //     })
    //     }
    //
    // </div>);
    
    return(<Accordion defaultActiveKey="0">
        {tables.map((table, i) => {return(<DatabaseTable table={table} key={i}/>)})}
    </Accordion>)

}