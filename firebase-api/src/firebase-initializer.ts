

import * as admin from "firebase-admin"
const serviceAccount = require('C:\\Users\\Jithendra.Thenuwara\\Downloads\\super-pass-64e2b-firebase-adminsdk-7zxq2-61f3d182fe.json')
export const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://super-pass-64e2b-default-rtdb.europe-west1.firebasedatabase.app'
});




