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
app.post("/trak/nft/request", (req, res) => requestNFTFunction({ req, res }));
app.get("/trak/nft/requests", (req, res) =>
  getNFTRequestsFunction({ req, res })
);
app.get("/trak/nft/request/:trakID", (req, res) =>
  getNFTRequestFunction({ req, res })
);
app.get("/script/trak/hasNFT", (req, res) =>
  scriptHasNFTFunction({ req, res })
);
app.post("/nft", (req, res) => setNFTFunction({ req, res }));
app.get("/nft/purchase/:nftID/:username", (req, res) =>
  purchaseNFTFunction({ req, res })
);
app.get("/user/:username/nft", (req, res) => getUserNFTFunction({ req, res }));
app.get("/nft/:id", (req, res) => getNFTFunction({ req, res }));
app.get("/user/:username/wallet", (req, res) =>
  getUserWalletFunction({ req, res })
);
app.get("/artist/:userID/portfolio", (req, res) =>
  getArtistPortfolioFunction({ req, res })
);
app.post("/nft/merchandise/add", (req, res) =>
  appendNFTMerchandiseFunction({ req, res })
);
app.get("/nft/merchandise/:nftID", (req, res) =>
  getNFTMerchandiseFunction({ req, res })
);

exports.BERNIE = functions.region("europe-west1").https.onRequest(app);
