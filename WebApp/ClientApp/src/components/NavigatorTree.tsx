import React from "react";
import {DatabaseTableDto} from "../models/models.Dto";
import {TreeNavigatorCollapsibleNode} from "./TreeNavigatorCollapsibleNode";

export interface NavigatorTreeProps {
    tables: DatabaseTableDto[],
    NodeClicked: (table: DatabaseTableDto) => void
}

export const NavigatorTree: React.FunctionComponent<NavigatorTreeProps> = ({tables, NodeClicked}) => {
    return (
        <div>
            {tables.map((table, i) => {
                return (<TreeNavigatorCollapsibleNode table={table} key={i} NodeClicked={(e) => NodeClicked(e)}/>)
            })}
        </div>
    )

}