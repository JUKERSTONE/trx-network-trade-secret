import { initializeApp, credential } from "firebase-admin";
var serviceAccount = require("../core/trx-traklist-firebase-adminsdk-t44y0-54b7fcbc7e.json");

export const db = initializeApp().firestore();

const options = {
  credential: credential.cert(serviceAccount),
};
const name = "TRAKLIST";

export const TRAKLIST = initializeApp(options, name);
