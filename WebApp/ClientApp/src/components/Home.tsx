import React, {useEffect, useState} from 'react';
import {DatabaseDto} from "../models/models.Dto";
import {AddDatabaseDialog} from "./AddDatabaseDialog";
import {DatabasePage} from "./DatabasePage";
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

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
        SetConnectedDatabases(newConnectedDatabases);
        ShowAddDialog();

    }
    const LoadConnectedDatabases = () => {
        let connectedDatabasesString = localStorage.getItem("ConnectedDatabases")
        if (connectedDatabasesString !== null) {
            let connectedDatabases = JSON.parse(connectedDatabasesString)
            setConnectedDatabases(connectedDatabases)
            SetSelectedDatabase(connectedDatabases)
        } else {
            ShowAddDialog()
        }
    }

    const CloseTab = (index: number) => {
        let newConnectedDatabases = [...connectedDatabases]
        newConnectedDatabases.splice(index, 1);
        SetConnectedDatabases(newConnectedDatabases);
    }

    const SetConnectedDatabases = (newConnectedDatabases: DatabaseDto[]) => {
        localStorage.setItem("ConnectedDatabases", JSON.stringify(newConnectedDatabases))
        setConnectedDatabases(newConnectedDatabases);
        SetSelectedDatabase(newConnectedDatabases)
    }

    const SetSelectedDatabase = (connectedDatabases: DatabaseDto[]) => {
        let length = connectedDatabases.length
        setKey(length > 0 ? `${length - 2}` : 'Add')
    }

    useEffect(() => {
        LoadConnectedDatabases()
    }, [])

    return (
        <>
            <Tabs className="mb-3">
                <TabList>
                    {connectedDatabases.map((database, i) => {
                        return (
                            <Tab key={i}>
                                {database?.databaseName} <span className='hover: text-red-500 text-sm p-2'
                                                               onClick={() => CloseTab(i)}>&#10005;</span>
                            </Tab>)
                    })}
                    <Tab disabled onClick={() => ShowAddDialog()}>Add</Tab>
                </TabList>


                {connectedDatabases.map((database, i) => {
                    return (
                        <TabPanel key={i}>
                            {database?.databaseName} <DatabasePage database={database}/>
                        </TabPanel>)
                })}
                <TabPanel></TabPanel>


            </Tabs>

            <AddDatabaseDialog showDialog={showAddDialog} connectDatabase={ConnectDatabase}
                               handleDialogInteraction={ShowAddDialog}/>
        </>


    );
}