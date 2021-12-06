import * as functions from "firebase-functions";
import * as express from "express";

export const app = express();

exports.BERNIE = functions.region("europe-west1").https.onRequest(app);
