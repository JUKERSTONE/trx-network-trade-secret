import * as functions from "firebase-functions";
import * as express from "express";
import { useCloudFunctions } from "./hooks";

const { handleSwapTokenFunction, handleRefreshTokenFunction } =
  useCloudFunctions();

export const app = express();

app.post("/spotify/swap", handleSwapTokenFunction);
app.post("/spotify/refresh", handleRefreshTokenFunction);

exports.TRAKLIST = functions.region("europe-west1").https.onRequest(app);
