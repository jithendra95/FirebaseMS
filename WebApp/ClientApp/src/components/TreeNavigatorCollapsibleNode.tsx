import React, {useState} from "react";
import {DatabaseTableDto} from "../models/models.Dto";

export interface DatabaseTableProps {
    table: DatabaseTableDto,
    NodeClicked: (table: DatabaseTableDto) => void
}

export const TreeNavigatorCollapsibleNode: React.FunctionComponent<DatabaseTableProps> = ({table, NodeClicked}) => {
    const [collapsed, setCollapsed] = useState(false)

    const NodeClickHandler = (table: DatabaseTableDto) => {
        NodeClicked(table);
    }
    return (
        <div className='pl-10'>
            <div onClick={() => {
                NodeClickHandler(table)
                setCollapsed(!collapsed)
            }} className='cursor-pointer'>{table?.name}</div>
            {collapsed && <div>
                {(table?.tables !== null && table?.tables) ? table.tables.map((x, i) => {
                        return (<TreeNavigatorCollapsibleNode table={x} key={i} NodeClicked={(e) => {
                            NodeClickHandler(e)
                        }}/>)
                    }) :
                    []
                }
                {/*{(table?.records !== null && table?.records) ? table.records.map(x => {*/}
                {/*    return (x.columns.find(x => x.name == '_id')?.value ?*/}
                {/*        <TreeNavigatorNode recordId={x.columns.find(x => x.name == '_id')!.value}*/}
                {/*                           key={x.columns.find(x => x.name == '_id')!.value}/> : [])*/}
                {/*}) : []}*/}
            </div>}
        </div>
    );
}