import React, {useState} from "react";
import {DatabaseTableDto} from "../../models/models.Dto";

export interface TreeNavigatorCollapsibleNodeProps {
    table: DatabaseTableDto,
    selectedNode?: DatabaseTableDto,
    NodeClicked: (table: DatabaseTableDto) => void
}

export const TreeNavigatorCollapsibleNode: React.FunctionComponent<TreeNavigatorCollapsibleNodeProps> = ({
                                                                                                             table,
                                                                                                             selectedNode,
                                                                                                             NodeClicked
                                                                                                         }) => {
    const [collapsed, setCollapsed] = useState(true)

    const NodeClickHandler = (table: DatabaseTableDto) => {
        if(table.records !== null && table.records.length > 0)
            NodeClicked(table);
    }
    
    const tableHasSubTables = (table?.tables !== null && table?.tables);
    const tableSelected = selectedNode?.path === table?.path;
    return (
        <div className='pl-5'>
            <div onClick={() => {
                NodeClickHandler(table)
                setCollapsed(!collapsed)
            }} className={`cursor-pointer ${ tableSelected ? 'bg-sky-500' : ''} hover:bg-sky-100 px-2 py-1 rounded`}>
                {(tableHasSubTables && collapsed? (<span>
                    &#8964;
                </span>) : [])}

                {(tableHasSubTables && !collapsed? (<span>
                    &#8250;
                </span>) : [])}
                {table?.name} {table.records !== null && <span className='text-xs text-gray-600'>{`(${table.records.length} records)`}</span>}
            </div>
            {collapsed && <div>
                {tableHasSubTables ? table.tables!.map((x, i) => {
                        return (<TreeNavigatorCollapsibleNode table={x} selectedNode={selectedNode}
                                                              NodeClicked={(e) => {
                                                                  NodeClickHandler(e)
                                                              }} key={i}/>)
                    }) :
                    []
                }
            </div>}
        </div>
    );
}