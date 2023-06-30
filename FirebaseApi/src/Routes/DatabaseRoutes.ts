import express from "express";
import {DatabaseController} from "../FirebaseRealtimeDb/DatabaseController";

const databaseRouter = express.Router();

databaseRouter.get('/database/:id', async function (req, res) {
    res.setHeader('content-type', 'application/json');
    let tables = await DatabaseController.GetTables(req.params.id);
    res.end(JSON.stringify(tables));
})

databaseRouter.get('/database/:id/:path', async function (req, res) {
    res.setHeader('content-type', 'application/json');
    console.log(req.params.path)
    let tables = await DatabaseController.GetTableData(req.params.id, req.params.path);
    res.end(JSON.stringify(tables));
})

databaseRouter.get('/database/:id/:path/:recordId', async function (req, res) {
    res.setHeader('content-type', 'application/json');
    let tableRecord = await DatabaseController.GetRecord(req.params.id, req.params.path, req.params.recordId);
    res.end(JSON.stringify(tableRecord));
})

databaseRouter.post('/database/:id/:path/:recordId', async function (req, res) {
    res.setHeader('content-type', 'application/json');
    await DatabaseController.CreateRecord(req.params.id, req.params.path, req.params.recordId, req.body);
    res.end("true");
})
databaseRouter.post('/database/:id/:path/', async function (req, res) {
    res.setHeader('content-type', 'application/json');
    await DatabaseController.CreateRecord(req.params.id, req.params.path, undefined, req.body);
    res.end("true");
})

databaseRouter.delete('/database/:id/:path/:recordId', async function (req, res) {
    res.setHeader('content-type', 'application/json');
    await DatabaseController.DeleteRecord(req.params.id, req.params.path, req.params.recordId);
    res.end(JSON.stringify(true));
})

databaseRouter.delete('/database/:id', async function (req, res) {
    res.setHeader('content-type', 'application/json');
    let isDisconnected = DatabaseController.DisconnectDatabase(req.params.id);
    res.end(JSON.stringify(isDisconnected));
})

export {databaseRouter};