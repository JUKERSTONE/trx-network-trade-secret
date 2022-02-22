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
  getTRAKFunction,
  getTRAKBankFunction,
  exchangeTRAKFunction,
  requestNFTFunction,
  getNFTRequestsFunction,
  scriptHasNFTFunction,
  setNFTFunction,
  purchaseNFTFunction,
  getUserWalletFunction,
  getArtistPortfolioFunction,
  appendNFTMerchandiseFunction,
  getNFTMerchandiseFunction,
  check,
} = useCloudFunctions();

export const app = express();

app.post("/trak", auth, setTRAKFunction);
app.post("/trak/verify/duplicate", verifyDuplicateFunction);
app.post("/trak/append", auth, appendTRAKFunction);
app.post("/trak/mine", mineTRAKFunction);
app.get("/trak/raffle/:subscription", auth, raffleFreeFunction);
app.get("/trak/:id", getTRAKFunction);
app.get("/trak", auth, getTRAKBankFunction);
app.post("/trak/exchange", auth, exchangeTRAKFunction);
app.post("/nft/request", auth, requestNFTFunction);
app.get("/nft/requests", auth, getNFTRequestsFunction);
app.get("/script/trak/hasNFT", scriptHasNFTFunction);
app.post("/nft", auth, setNFTFunction);
app.get("/nft/:nftID/purchase", auth, purchaseNFTFunction);
app.get("/user/wallet", auth, getUserWalletFunction);
app.get("/artist/portfolio", auth, getArtistPortfolioFunction);
app.post("/nft/merchandise", auth, appendNFTMerchandiseFunction);
app.get("/nft/:nftID/merchandise", auth, getNFTMerchandiseFunction);
app.get("/check", auth, check);

exports.BERNIE = functions.region("europe-west1").https.onRequest(app);
