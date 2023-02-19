import {TableRecord} from "../../models/models.Dto";
import React from "react";
import Form from "react-bootstrap/Form";

export interface DatabaseTableRecordProps {
    record: TableRecord,
    columns: string[]
}

export const DatabaseTableRecord: React.FunctionComponent<DatabaseTableRecordProps> = ({record, columns}) => {
    return (
            <tr>
                <td><Form.Check type='checkbox'/></td>
                {columns.map((column, i) => {
                    return (<td key={i} className='hover:bg-sky-100'>{record.values[column]} </td>)
                })}
            </tr>
    )
}