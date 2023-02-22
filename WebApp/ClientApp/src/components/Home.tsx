import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {DatabaseDto, DatabaseTableDto} from "../models/models.Dto";
import {DatabaseTable} from "./DatabaseTable/DatabaseTable";
import {NavigatorTree} from "./TreeNavigator/NavigatorTree";
import {HeaderMenu} from "./HeaderMenu/HeaderMenu";


export function Home() {
    const [databases, setDatabases] = useState<DatabaseDto>();
    const [databaseTables, setDatabaseTables] = useState([]);
    const [selectedTable, setSelectedTable] = useState<DatabaseTableDto>();
    const loadDatabaseData = async () => {


        const response3 = await fetch(`database/1`);
        const data3 = await response3.json();
        
        setDatabases(data3)
        setDatabaseTables(data3.tables)
    }

    const DatabaseTableSelected = (table: DatabaseTableDto) => {
         FetchDatabaseTables(table);
    }

    const FetchDatabaseTables = async (table: DatabaseTableDto)=> {
        const response = await fetch(`database/${databases?.id}/${table.path}`);
        const data = await response.json();
        
        if(data.records !== null && data.records.length > 0)
            setSelectedTable(data);
    }

    useEffect(() => {
        loadDatabaseData();
    }, [])


    return (
        <div>
            <Container fluid>
                <Row>
                    <HeaderMenu currentPath={selectedTable?.path}/>
                </Row>
                <Row>
                    <Col md={2}>
                        <NavigatorTree tables={databaseTables} selectedNode={selectedTable} NodeClicked={(e) => DatabaseTableSelected(e)}/>
                    </Col>
                    <Col md={10}>
                        {selectedTable && <DatabaseTable selectedTable={selectedTable}/>}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}