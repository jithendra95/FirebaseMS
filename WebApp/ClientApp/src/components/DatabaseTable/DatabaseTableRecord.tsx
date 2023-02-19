import {TableRecord} from "../../models/models.Dto";
import React from "react";

export interface DatabaseTableRecordProps {
    record: TableRecord
}

export const DatabaseTableRecord: React.FunctionComponent<DatabaseTableRecordProps> = ({record}) => {
    return (
        <tr>
            {record?.columns.map((column, i) => {
                return (<td key={i} className='hover:bg-sky-100'>{column.value} </td>)
            })}
        </tr>
    )

}