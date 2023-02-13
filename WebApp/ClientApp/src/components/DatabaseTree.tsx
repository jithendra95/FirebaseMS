import React from "react";
import {Table} from "../models/models.Dto";

export interface DatabaseTreeProps {
    tables: Table[]
}

export const DatabaseTree: React.FunctionComponent<DatabaseTreeProps> = ({tables}) => {
    return (<div>
        {tables.map(table => {
            return (<div>{table.name}</div>);
        })
        }
    </div>);

}