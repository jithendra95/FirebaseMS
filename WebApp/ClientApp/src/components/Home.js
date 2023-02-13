import React, {useEffect, useState} from 'react';
import {AddDatabaseDialog} from "./AddDatabaseDialog";
import {Col, Container, Row} from "react-bootstrap";
import {DatabaseTree} from "./DatabaseTree";
import {DatabaseTable} from "./DatabaseTable";


export function Home() {
    const [databases, setDatabases] = useState([]);
    const [databaseTables, setDatabaseTables] = useState([]);
    const loadDatabaseData = async () => {
        const response = await fetch('database');
        const data = await response.json();

        const response3 = await fetch(`database/${data[0]?.id}`);
        const data3 = await response3.json();
        setDatabases(data)
        setDatabaseTables(data3.tables)
    }

    useEffect(() => {
        loadDatabaseData();
    }, [])
    return (
        <div>
            <Container fluid>
                <Row>
                    <Col xs={4}>
                        <DatabaseTree tables={databaseTables}/>
                    </Col>
                    <Col xs={4}>
                        <DatabaseTable/>
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