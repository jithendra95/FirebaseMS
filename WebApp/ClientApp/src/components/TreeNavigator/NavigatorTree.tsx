import React from "react";
import Form from 'react-bootstrap/Form';
import {TreeNavigatorCollapsibleNode} from "./TreeNavigatorCollapsibleNode";
import {DatabaseTableDto} from "../../models/models.Dto";

export interface NavigatorTreeProps {
    tables: DatabaseTableDto[],
    selectedNode?: DatabaseTableDto,
    NodeClicked: (table: DatabaseTableDto) => void
}

export const NavigatorTree: React.FunctionComponent<NavigatorTreeProps> = ({tables, selectedNode, NodeClicked}) => {
    return (
        <div className='pr-2'>
            <div>
                <Form.Control
                    type="text"
                    id="navTreeSearch"
                    placeholder='Search'
                />
            </div>
            {tables.map((table, i) => {
                return (<TreeNavigatorCollapsibleNode table={table}  selectedNode={selectedNode} NodeClicked={(e) => NodeClicked(e)} key={i}/>)
            })}
        </div>
    )

}