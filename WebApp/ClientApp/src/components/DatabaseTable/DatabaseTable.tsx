import {DatabaseTableDto} from "../../models/models.Dto";
import React from "react";
import {DatabaseTableColumns} from "./DatabaseTableColumns";
import {DatabaseTableRecord} from "./DatabaseTableRecord";
import Table from 'react-bootstrap/Table';
import {TableOptions} from "./TableOptions";

export interface NavigatorTreeProps {
    selectedTable: DatabaseTableDto
}

export const DatabaseTable: React.FunctionComponent<NavigatorTreeProps> = ({selectedTable}) => {
    return (
        <>
            <TableOptions/>
            <Table bordered responsive className='text-sm'>
                {selectedTable?.records !== null ?
                    (<>
                        <thead>
                        <DatabaseTableColumns columns={selectedTable?.columns}/>
                        </thead>

                        <tbody>
                        {selectedTable?.records?.map((record, i) => {
                            return (<DatabaseTableRecord record={record} columns={selectedTable?.columns} key={i}/>)
                        })}
                        </tbody>
                    </>) : []}
            </Table>
        </>
    )
}