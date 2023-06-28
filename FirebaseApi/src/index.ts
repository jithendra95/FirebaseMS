import express = require("express");
import {credentialsRouter} from "./Routes/CredentialsRoutes"
import {databaseRouter} from "./Routes/DatabaseRoutes";


let bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json())

app.use("/", credentialsRouter)
app.use("/", databaseRouter)





const port = process.env.PORT || 5050;
app.listen(port, ()=> {
    console.log("Application started");
});
