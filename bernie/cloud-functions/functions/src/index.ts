import * as functions from "firebase-functions";
import * as express from "express";
import { useCloudFunctions } from "./hooks";

const {
  setTRAKFunction,
  appendTRAKFunction,
  mineTRAKFunction,
  raffleFreeFunction,
  verifyDuplicateFunction,
  getUserTRAKFunction,
  getTRAKFunction,
  getTRAKBankFunction,
  exchangeTRAKFunction,
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
app.get("/user/:username/trak", (req, res) =>
  getUserTRAKFunction({ req, res })
);
app.get("/trak/:id", (req, res) => getTRAKFunction({ req, res }));
app.get("/trak", (req, res) => getTRAKBankFunction({ req, res }));
app.get("/trak/exchange/:bought/:sold/:username", (req, res) =>
  exchangeTRAKFunction({ req, res })
);

exports.BERNIE = functions.region("europe-west1").https.onRequest(app);
