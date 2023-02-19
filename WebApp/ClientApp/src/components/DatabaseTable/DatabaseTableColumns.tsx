import React from "react";
import Form from 'react-bootstrap/Form';

export interface DatabaseTableColumnProps {
    columns: string[]
}

export const DatabaseTableColumns: React.FunctionComponent<DatabaseTableColumnProps> = ({columns}) => {
    return (
            <tr>
                <th><Form.Check type='checkbox'/></th>
                {columns?.map((column, i) => {
                    return (<th key={i}> {column}</th>)
                })}
            </tr>
    )
}