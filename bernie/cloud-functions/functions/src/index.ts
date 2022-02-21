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
  getUserTRAKFunction,
  getTRAKFunction,
  getTRAKBankFunction,
  exchangeTRAKFunction,
  requestNFTFunction,
  getNFTRequestsFunction,
  getNFTRequestFunction,
  scriptHasNFTFunction,
  setNFTFunction,
  purchaseNFTFunction,
  getUserNFTFunction,
  getNFTFunction,
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
app.get("/user/:username/trak", auth, getUserTRAKFunction);
app.get("/trak/:id", getTRAKFunction);
app.get("/trak", auth, getTRAKBankFunction);
app.get(
  "/trak/exchange/:bought/:sold/:username",
  auth,
  /**rename*/ exchangeTRAKFunction
);
app.post("/trak/nft/request", auth, /**rename*/ requestNFTFunction);
app.get("/trak/nft/requests", /**rename */ getNFTRequestsFunction);
app.get("/trak/nft/request/:trakID", /**rename */ getNFTRequestFunction);
app.get("/script/trak/hasNFT", auth, scriptHasNFTFunction);
app.post("/nft", auth, setNFTFunction);
app.get("/nft/purchase/:nftID/:username", auth, purchaseNFTFunction);
app.get("/user/:username/nft", auth, getUserNFTFunction);
app.get("/nft/:id", auth, getNFTFunction);
app.get("/user/:username/wallet", auth, getUserWalletFunction);
app.get("/artist/:userID/portfolio", auth, getArtistPortfolioFunction);
app.post(
  "/nft/merchandise/add",
  auth,
  /** rename*/ appendNFTMerchandiseFunction
);
app.get(
  "/nft/merchandise/:nftID",
  auth,
  /** rename */ getNFTMerchandiseFunction
);

exports.BERNIE = functions.region("europe-west1").https.onRequest(app);
