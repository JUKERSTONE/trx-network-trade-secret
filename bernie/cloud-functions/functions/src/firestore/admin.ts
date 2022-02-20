import { initializeApp, credential } from "firebase-admin";
var serviceAccount = require("../core/trx-traklist-firebase-adminsdk-t44y0-54b7fcbc7e.json");

const bernie = initializeApp();
export const db = bernie.firestore();

export const trx = initializeApp(
  {
    credential: credential.cert(serviceAccount),
  },
  "TRX"
);
