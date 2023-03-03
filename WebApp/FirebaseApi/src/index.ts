import express = require("express");
import {RealtimeDatabaseController} from "./FirebaseRealtimeDb/RealTimeDatabaseController";


let bodyParser = require('body-parser')
const app = express();
// parse application/json
app.use(bodyParser.json())


app.get('/realtimeDb/:id', async function (req, res) {
    res.setHeader('content-type', 'application/json');
    let tables = await RealtimeDatabaseController.GetTablesForDatabase(req.params.id);
    res.end(JSON.stringify(tables));
})

app.post('/loadDatabase', function (req, res) {
    res.setHeader('content-type', 'application/json');
    RealtimeDatabaseController.LoadDatabases(req.body);
    res.end("true");
})

const port = process.env.PORT || 5050;
app.listen(port, ()=> {
    console.log("Application started");
});
