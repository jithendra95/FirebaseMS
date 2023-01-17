
import express from "express";
import {loadDatabase} from "./firebase-real-time-db/read-database";
import {RealtimeDbService} from "./firebase-real-time-db/realtime-db-service";
const app = express();

app.get('/realtimeDb', function (req, res) {
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify(RealtimeDbService.GetAllTables()));
})

const port = process.env.PORT || 5050;
app.listen(port, ()=> {
    console.log("Application started");
    loadDatabase();
});
