import React, {useEffect, useState} from 'react';
import {DatabaseDto} from "../models/models.Dto";
import {AddDatabaseDialog} from "./AddDatabaseDialog";
import {DatabasePage} from "./DatabasePage";
import {Tab, TabList, TabPanel, Tabs} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import axios from "axios";

export const Home = () => {
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [connectedDatabases, setConnectedDatabases] = useState<DatabaseDto[]>([]);
    const [key, setKey] = useState('1');

    const ShowOrHideAddDialog = () => {
        setShowAddDialog(!showAddDialog);
    }

    const ConnectDatabase = (database: DatabaseDto) => {
        let newConnectedDatabases = [...connectedDatabases]
        newConnectedDatabases.push(database)
        SetConnectedDatabases(newConnectedDatabases);
        SendConnectionMessage(database.id);
        ShowOrHideAddDialog();

    }
    const LoadConnectedDatabases = () => {
        let connectedDatabasesString = localStorage.getItem("ConnectedDatabases")
        if (connectedDatabasesString !== null) {
            let connectedDatabases = JSON.parse(connectedDatabasesString) as DatabaseDto[]
            connectedDatabases.map(database =>{
                SendConnectionMessage(database.id);
            })
            setConnectedDatabases(connectedDatabases)
            SetSelectedDatabase(connectedDatabases)
           
        } else {
            ShowOrHideAddDialog()
        }
        
        
        
    }
    
    const SendConnectionMessage = async (databaseId: string) =>{
        await axios.post(`database/connect/${databaseId}`)
    }

    const CloseTab = async (index: number) => {
        let database = connectedDatabases[index];
        let isDatabaseDisconnected = await axios.delete(`database/${database.id}`);
        if (isDatabaseDisconnected) {
            let newConnectedDatabases = [...connectedDatabases]
            newConnectedDatabases.splice(index, 1);
            SetConnectedDatabases(newConnectedDatabases);
        }
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
                    <Tab disabled onClick={() => ShowOrHideAddDialog()}>Add</Tab>
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
                               handleDialogInteraction={ShowOrHideAddDialog}/>
        </>


    );
}