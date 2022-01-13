import * as functions from "firebase-functions";
import * as express from "express";
import { useCloudFunctions } from "./hooks";

const {
  setTRAKFunction,
  appendTRAKFunction,
  mineTRAKFunction,
  raffleFreeFunction,
  verifyDuplicateFunction,
} = useCloudFunctions();

export const app = express();

app.post("/trak", (req, res) => setTRAKFunction({ req, res }));
app.post("/trak/verify/duplicate", (req, res) =>
  verifyDuplicateFunction({ req, res })
);
app.post("/trak/append", (req, res) => appendTRAKFunction({ req, res }));
app.post("/trak/mine", (req, res) => mineTRAKFunction({ req, res }));
app.get("/trak/raffle/:subscription/:username", (req, res) =>
  raffleFreeFunction({ req, res })
);

exports.BERNIE = functions.region("europe-west1").https.onRequest(app);
