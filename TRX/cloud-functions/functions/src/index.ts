import * as functions from "firebase-functions";
import * as express from "express";
import { useCloudFunctions } from "./hooks";
import { firebaseAuth } from "./core";

const { getUserFunction } = useCloudFunctions();

export const app = express();

app.get("/user", (req, res) => getUserFunction({ req, firebaseAuth, res }));

exports.TRAKLIST = functions.region("europe-west1").https.onRequest(app);
