import {TableColumn} from "../../models/models.Dto";
import React from "react";

export interface DatabaseTableColumnProps {
    columns: TableColumn[]
}

export const DatabaseTableColumns: React.FunctionComponent<DatabaseTableColumnProps> = ({columns}) => {
    return (
        <tr>
            {columns?.map((column, i) => {
                return (<th key={i}> {column.name}</th>)
            })}
        </tr>
    )

}