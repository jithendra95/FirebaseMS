import {DatabaseDto, DatabaseTableDto} from "../models/models.Dto";
import React, {useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {HeaderMenu} from "./HeaderMenu/HeaderMenu";
import {NavigatorTree} from "./TreeNavigator/NavigatorTree";
import {DatabaseTable} from "./DatabaseTable/DatabaseTable";

export interface DatabasePageProps {
    database: DatabaseDto
}

export const DatabasePage: React.FunctionComponent<DatabasePageProps> = ({database}) => {
    const [databaseTables, setDatabaseTables] = useState([]);
    const [selectedTable, setSelectedTable] = useState<DatabaseTableDto>();
    
    const DatabaseTableSelected = (table: DatabaseTableDto) => {
        FetchDatabaseTables(table);
    }

    const FetchDatabaseTables = async (table: DatabaseTableDto) => {
        const response = await fetch(`database/${database?.id}/${table.path}`);
        const data = await response.json();

        if (data.records !== null && data.records.length > 0)
            setSelectedTable(data);
    }

    const loadDatabaseData = async () => {
        const response = await fetch(`database/${database.id}`);
        const data = await response.json(); 
        if(data.tables !== null)
            setDatabaseTables(data.tables)
    }
    
    useEffect(() => {
        loadDatabaseData();
    }, [])

    return (<div>
        <Container fluid>
            <Row>
                <HeaderMenu currentPath={selectedTable?.path ?? database?.databaseName}/>
            </Row>
            <Row>
                <Col md={2}>
                    <NavigatorTree tables={databaseTables} selectedNode={selectedTable}
                                   NodeClicked={(e) => DatabaseTableSelected(e)}/>
                </Col>
                <Col md={10}>
                    {selectedTable && <DatabaseTable selectedTable={selectedTable}/>}
                </Col>
            </Row>
        </Container>
    </div>)
}