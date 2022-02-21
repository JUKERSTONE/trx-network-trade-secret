import * as functions from "firebase-functions";
import * as express from "express";
import { useCloudFunctions } from "./hooks";
import { auth } from "./core";

const {
  setTRAKFunction,
  appendTRAKFunction,
  mineTRAKFunction,
  raffleFreeFunction,
  verifyDuplicateFunction,
  // getUserTRAKFunction,
  getTRAKFunction,
  getTRAKBankFunction,
  exchangeTRAKFunction,
  requestNFTFunction,
  getNFTRequestsFunction,
  // getNFTRequestFunction,
  scriptHasNFTFunction,
  setNFTFunction,
  purchaseNFTFunction,
  // getUserNFTFunction,
  // getNFTFunction,
  getUserWalletFunction,
  getArtistPortfolioFunction,
  appendNFTMerchandiseFunction,
  getNFTMerchandiseFunction,
} = useCloudFunctions();

export const app = express();

app.post("/trak", auth, setTRAKFunction);
app.post("/trak/verify/duplicate", verifyDuplicateFunction);
app.post("/trak/append", auth, appendTRAKFunction);
app.post("/trak/mine", mineTRAKFunction);
app.get("/trak/raffle/:subscription/:username", auth, raffleFreeFunction);
// app.get("/user/:username/trak", auth, getUserTRAKFunction);
app.get("/trak/:id", getTRAKFunction);
app.get("/trak", auth, getTRAKBankFunction);
app.get(
  "/trak/exchange/:bought/:sold/:username",
  auth,
  /**params to body*/ exchangeTRAKFunction
);
app.post("/nft/request", auth, requestNFTFunction);
app.get("/nft/requests", auth, getNFTRequestsFunction);
// app.get("/trak/nft/request/:trakID", auth, /**rename */ getNFTRequestFunction);
app.get("/script/trak/hasNFT", scriptHasNFTFunction);
app.post("/nft", auth, setNFTFunction);
app.get("/nft/:nftID/purchase/:username", auth, purchaseNFTFunction);
// app.get("/user/:username/nft", auth, getUserNFTFunction);
// app.get("/nft/:id", auth, getNFTFunction);
app.get("/user/:username/wallet", auth, getUserWalletFunction);
app.get("/artist/:userID/portfolio", auth, getArtistPortfolioFunction);
app.post("/nft/merchandise", auth, appendNFTMerchandiseFunction);
app.get("/nft/:nftID/merchandise", auth, getNFTMerchandiseFunction);

exports.BERNIE = functions.region("europe-west1").https.onRequest(app);
