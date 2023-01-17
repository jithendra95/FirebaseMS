import {app} from "../firebase-initializer";
import {database} from "firebase-admin";
import {RealtimeDbService} from "./realtime-db-service";


export async function loadDatabase() {
    const db = database(app);
    const ref = db.ref('/');
    let root: object;

    ref.on("value", (snapshot) => {
        root = snapshot.val();
        RealtimeDbService.LoadTables(root);
        console.log('The read success');
    }, (errorObject) => {
        console.log('The read failed: ' + errorObject.name);
    });
}

