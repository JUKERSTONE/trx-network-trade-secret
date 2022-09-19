import * as functions from "firebase-functions";
import * as express from "express";
import { useCloudFunctions } from "./hooks";
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
} = useCloudFunctions();

export const app = express();

app.post("/spotify/swap", handleSwapTokenFunction);
app.post("/spotify/refresh", handleRefreshTokenFunction);
app.post("/traklite/admin/trending", auth, setTLTTrendingFunction);
app.get("/traklite/admin/trending", getTLTTrendingFunction);
app.post("/traklite/admin/news", auth, setTLTNewsFunction);
app.get("/traklite/admin/news", getTLTNewsFunction);
app.get("/traklist/be_real", triggerBeRealFunction);

exports.TRAKLIST_API = functions.region("europe-west1").https.onRequest(app);
exports.viewBeRealNotification = functions.https.onRequest(
  viewBeRealNotificationFunction
);
