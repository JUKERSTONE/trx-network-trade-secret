import * as functions from "firebase-functions";
import * as express from "express";
import { useCloudFunctions } from "./hooks";

const { setTRAKFunction } = useCloudFunctions();

export const app = express();

app.post("/trak", (req, res) => setTRAKFunction({ req, res }));

exports.BERNIE = functions.region("europe-west1").https.onRequest(app);
