import express from "express";
import {CredentialManager} from "../CredentialManager/CredentialManager";

const credentialsRouter = express.Router();

credentialsRouter.get('/credentials', async function (req, res) {
    res.setHeader('content-type', 'application/json');
    let credentials = await CredentialManager.GetCredentials();
    res.end(JSON.stringify(credentials));
})
credentialsRouter.get('/credentials/:id', async function (req, res) {
    res.setHeader('content-type', 'application/json');
    let credentials = await CredentialManager.GetCredentialsById(req.params.id);
    res.end(JSON.stringify(credentials));
})

credentialsRouter.post('/credentials', async function (req, res) {
    res.setHeader('content-type', 'application/json');
    CredentialManager.CreateCredential(req.body);
    res.end("true");
})

credentialsRouter.delete('/credentials/:id', async function (req, res) {
    res.setHeader('content-type', 'application/json');
    let isDeleted = await CredentialManager.DeleteCredential(req.params.id);
    res.end(JSON.stringify({success: isDeleted}));
})

export {credentialsRouter};