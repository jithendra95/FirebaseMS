import React, {useEffect, useState} from 'react';
import {DatabaseDto} from "../models/models.Dto";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {AddDatabaseDialog} from "./AddDatabaseDialog";
import {DatabasePage} from "./DatabasePage";

export const Home = () => {
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [connectedDatabases, setConnectedDatabases] = useState<DatabaseDto[]>([]);
    const [key, setKey] = useState('1');

    const ShowAddDialog = () => {
        setShowAddDialog(!showAddDialog);
    }

    const ConnectDatabase = (database: DatabaseDto) => {
        let newConnectedDatabases = [...connectedDatabases]
        newConnectedDatabases.push(database)
        localStorage.setItem("ConnectedDatabases", JSON.stringify(newConnectedDatabases))
        setConnectedDatabases(newConnectedDatabases);
        ShowAddDialog();
        SetSelectedDatabase(newConnectedDatabases)

    }
    const LoadConnectedDatabases = ()=>{
        let connectedDatabasesString = localStorage.getItem("ConnectedDatabases")
        if(connectedDatabasesString !== null){
            let connectedDatabases  = JSON.parse(connectedDatabasesString)
            setConnectedDatabases(connectedDatabases)
            SetSelectedDatabase(connectedDatabases)
        }else{
            ShowAddDialog()
        }
    }

    const SetSelectedDatabase = (connectedDatabases: DatabaseDto[]) => {
        let length = connectedDatabases.length
        setKey(length > 0 ? `${length - 1}` : 'Add')
    }

    useEffect(() => {
        LoadConnectedDatabases()
    }, [])

    return (
        <>
            <Tabs
                activeKey={key}
                onSelect={(k) => k === 'Add' ? ShowAddDialog() : setKey(k!)
                }
                className="mb-3"
            >
                {connectedDatabases.map((database, i) => {
                    return (
                        <Tab eventKey={i} key={i} title={database?.databaseName}>
                            <DatabasePage database={database}/>
                        </Tab>)
                })}
                <Tab title="Add" eventKey="Add"></Tab>
            </Tabs>

            <AddDatabaseDialog showDialog={showAddDialog} connectDatabase={ConnectDatabase}
                               handleDialogInteraction={ShowAddDialog}/>
        </>


    );
}