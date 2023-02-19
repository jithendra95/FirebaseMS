import express = require("express");
import {RealtimeDatabaseController} from "./firebase-real-time-db/realtime-database-controller";

let bodyParser = require('body-parser')
const app = express();
// parse application/json
app.use(bodyParser.json())


app.get('/realtimeDb/:id', function (req, res) {
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify(RealtimeDatabaseController.GetTablesForDatabase(req.params.id)));
})

app.post('/loadDatabase', function (req, res) {
    res.setHeader('content-type', 'application/json');
    RealtimeDatabaseController.LoadDatabases(req.body);
    res.end("true");
})

const port = process.env.PORT || 5050;
app.listen(port, ()=> {
    console.log("Application started");
    // loadDatabase();
});
