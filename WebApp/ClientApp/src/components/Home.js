import React, {useEffect, useState} from 'react';
import {AddDatabaseDialog} from "./AddDatabaseDialog";


export function Home() {
    const [databases, setDatabases] = useState([]);
    const loadDatabaseData = async ()=>{
        const response = await fetch('database');
        const data = await response.json();
        setDatabases(data)
    }
    
    useEffect(()=>{
        loadDatabaseData();
    }, [])
    return (
        <div>
            {databases.map(database=>{
                return(<div key={database.id} >{database.databaseName}</div>)
            })}
            <AddDatabaseDialog/>
        </div>
    );
}