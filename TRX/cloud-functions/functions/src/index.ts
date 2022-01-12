import * as functions from "firebase-functions";
import * as express from "express";
import { useCloudFunctions } from "./hooks";

const { registerUserFunction } = useCloudFunctions();

export const app = express();

app.post("/register", (req, res) => registerUserFunction({ req, res }));

exports.TRAKLIST = functions.region("europe-west1").https.onRequest(app);
