import * as functions from "firebase-functions";
import * as express from "express";
import {
  spreadISRC,
  useCloudFunctions,
  getTrx00GenreCollections,
} from "./hooks";
import { auth } from "./core";

const {
  handleSwapTokenFunction,
  handleRefreshTokenFunction,
  setTLTTrendingFunction,
  getTLTTrendingFunction,
  setTLTNewsFunction,
  getTLTNewsFunction,
  triggerBeRealFunction,
  viewBeRealNotificationFunction,
  stripePaymentIntentFunction,
  // migrateSessionsFunctions,
  setTrakFunction,
  verifyDuplicateTrakFunction,
  transformTrx04Function,
} = useCloudFunctions();

export const app = express();

app.post("/spotify/swap", handleSwapTokenFunction);
app.post("/spotify/refresh", handleRefreshTokenFunction);
app.post("/traklite/admin/trending", auth, setTLTTrendingFunction);
app.get("/traklite/admin/trending", getTLTTrendingFunction);
app.post("/traklite/admin/news", auth, setTLTNewsFunction);
app.get("/traklite/admin/news", getTLTNewsFunction);
app.get("/traklist/be_real", triggerBeRealFunction);
app.post("/trakstar/stripe", stripePaymentIntentFunction);
// app.get("/trx/script/playback", migrateSessionsFunctions);
app.post("/trx_00/trak", auth, setTrakFunction);
app.post("/trx_00/trak/verify/duplicate", verifyDuplicateTrakFunction);
app.get("/trx_04/transform", transformTrx04Function);
app.get("/trx_00/spread/isrc", spreadISRC);
// app.get("/trx_00/trak/structure", correctDataStructure);
app.get("/trx_00/genre", getTrx00GenreCollections);

exports.TRAKLIST_API = functions.region("europe-west1").https.onRequest(app);
exports.viewBeRealNotification = functions.https.onRequest(
  viewBeRealNotificationFunction
);
