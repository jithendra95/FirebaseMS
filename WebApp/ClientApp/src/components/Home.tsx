import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {NavigatorTree} from "./NavigatorTree";
import {TreeNavigatorCollapsibleNode} from "./TreeNavigatorCollapsibleNode";
import {DatabaseTableDto} from "../models/models.Dto";
import {DatabaseTable} from "./DatabaseTable/DatabaseTable";


export function Home() {
    const [databases, setDatabases] = useState([]);
    const [databaseTables, setDatabaseTables] = useState([]);
    const [selectedTable, setSelectedTable] = useState<DatabaseTableDto>();
    const loadDatabaseData = async () => {
        const response = await fetch('database');
        const data = await response.json();

        const response3 = await fetch(`database/${data[0]?.id}`);
        const data3 = await response3.json();
        setDatabases(data)
        setDatabaseTables(data3.tables)
    }

    const DatabaseTableSelected = (table: DatabaseTableDto) => {
        setSelectedTable(table);
    }

    useEffect(() => {
        loadDatabaseData();
    }, [])


    return (
        <div>
            <Container fluid>
                <Row>
                    <Col xs={2}>
                        <NavigatorTree tables={databaseTables} NodeClicked={(e) => DatabaseTableSelected(e)}/>
                    </Col>
                    <Col xs={10}>
                        {selectedTable && <DatabaseTable selectedTable={selectedTable}/>}
                    </Col>
                </Row>
            </Container>
            {/*{databases.map(database => {*/}
            {/*    return (<div key={database.id}>{database.databaseName}</div>)*/}
            {/*})}*/}
            {/*<AddDatabaseDialog/>*/}
        </div>
    );
}