import {DatabaseTableDto} from "../../models/models.Dto";
import React from "react";
import {DatabaseTableColumns} from "./DatabaseTableColumns";
import {DatabaseTableRecord} from "./DatabaseTableRecord";
import Table from 'react-bootstrap/Table';

export interface NavigatorTreeProps {
    selectedTable: DatabaseTableDto
}

export const DatabaseTable: React.FunctionComponent<NavigatorTreeProps> = ({selectedTable}) => {
    return (
        <Table bordered responsive>
            {selectedTable?.records !== null ?
                (<>
                    <thead>
                    <DatabaseTableColumns columns={selectedTable?.records[0]?.columns}/>
                    </thead>

                    <tbody>
                    {selectedTable?.records?.map((record, i) => {
                        return (<DatabaseTableRecord record={record} key={i}/>)
                    })}
                    </tbody>
                </>) : []}
        </Table>
    )

}