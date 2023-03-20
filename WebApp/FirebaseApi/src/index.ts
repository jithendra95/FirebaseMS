import express = require("express");
import {DatabaseController} from "./FirebaseRealtimeDb/DatabaseController";


let bodyParser = require('body-parser')
const app = express();
// parse application/json
app.use(bodyParser.json())


app.get('/database/:id', async function (req, res) {
    res.setHeader('content-type', 'application/json');
    let tables = await DatabaseController.GetTablesForDatabase(req.params.id);
    res.end(JSON.stringify(tables));
})

app.delete('/database/:id', async function (req, res) {
    res.setHeader('content-type', 'application/json');
    let isDisconnected = DatabaseController.DisconnectDatabase(req.params.id);
    res.end(JSON.stringify(isDisconnected));
})

app.post('/database', function (req, res) {
    res.setHeader('content-type', 'application/json');
    DatabaseController.LoadDatabases(req.body);
    res.end("true");
})

const port = process.env.PORT || 5050;
app.listen(port, ()=> {
    console.log("Application started");
});
