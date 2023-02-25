import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {DatabaseDto, DatabaseTableDto} from "../models/models.Dto";
import {DatabaseTable} from "./DatabaseTable/DatabaseTable";
import {NavigatorTree} from "./TreeNavigator/NavigatorTree";
import {HeaderMenu} from "./HeaderMenu/HeaderMenu";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {AddDatabaseDialog} from "./AddDatabaseDialog";

export function Home() {
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [database, setDatabase] = useState<DatabaseDto>();
    const [databaseTables, setDatabaseTables] = useState([]);
    const [selectedTable, setSelectedTable] = useState<DatabaseTableDto>();
    const [key, setKey] = useState('1');
    
    const loadDatabaseData = async () => {


        const response3 = await fetch(`database/1`);
        const data3 = await response3.json();

        setDatabase(data3)
        setDatabaseTables(data3.tables)
    }

    const DatabaseTableSelected = (table: DatabaseTableDto) => {
        FetchDatabaseTables(table);
    }

    const FetchDatabaseTables = async (table: DatabaseTableDto) => {
        const response = await fetch(`database/${database?.id}/${table.path}`);
        const data = await response.json();

        if (data.records !== null && data.records.length > 0)
            setSelectedTable(data);
    }

    const ShowAddDialog = () => {
        setShowAddDialog(!showAddDialog);
    }

    useEffect(() => {
        loadDatabaseData();
    }, [])


    return (
        <>
            <Tabs
                activeKey={key}
                onSelect={(k) => k === 'Add' ? ShowAddDialog() : setKey(k!)
            }
                className="mb-3"
            >
                <Tab eventKey="1" title={database?.databaseName}>
                    <div>
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
                    </div>
                </Tab>
                <Tab title="Add" eventKey="Add"></Tab>
            </Tabs>

            <AddDatabaseDialog showDialog={showAddDialog} handleDialogInteraction={ShowAddDialog}/>
        </>


    );
}