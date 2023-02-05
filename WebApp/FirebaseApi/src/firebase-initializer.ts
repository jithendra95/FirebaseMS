import * as admin from "firebase-admin"

export const firebaseApp = (serveicePath: string, databaseUrl: string, appName: string)=>{
    const serviceAccount = require(serveicePath);
    return admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: databaseUrl
    }, appName);
}

// const serviceAccount = require('C:\\Users\\Jithendra.Thenuwara\\Downloads\\super-pass-64e2b-firebase-adminsdk-7zxq2-61f3d182fe.json');
// return admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: 'https://super-pass-64e2b-default-rtdb.europe-west1.firebasedatabase.app'
// });





