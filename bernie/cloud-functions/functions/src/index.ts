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

app.post("/trak", /**auth */ (req, res) => setTRAKFunction({ req, res }));
app.post("/trak/verify/duplicate", (req, res) =>
  verifyDuplicateFunction({ req, res })
);
app.post(
  "/trak/append",
  /**auth */ (req, res) => appendTRAKFunction({ req, res })
);
app.post("/trak/mine", (req, res) => mineTRAKFunction({ req, res }));
app.get(
  "/trak/raffle/:subscription/:username",
  /**auth */ (req, res) => raffleFreeFunction({ req, res })
);
app.get(
  "/user/:username/trak",
  /**auth */ (req, res) => getUserTRAKFunction({ req, res })
);
app.get("/trak/:id", (req, res) => getTRAKFunction({ req, res }));
app.get("/trak", /**auth */ (req, res) => getTRAKBankFunction({ req, res }));
app.get(
  "/trak/exchange/:bought/:sold/:username",
  /**auth rename*/ (req, res) => exchangeTRAKFunction({ req, res })
);
app.post(
  "/trak/nft/request",
  /**auth rename*/ (req, res) => requestNFTFunction({ req, res })
);
app.get(
  "/trak/nft/requests",
  /**rename */ (req, res) => getNFTRequestsFunction({ req, res })
);
app.get(
  "/trak/nft/request/:trakID",
  /**rename */ (req, res) => getNFTRequestFunction({ req, res })
);
app.get(
  "/script/trak/hasNFT",
  /**auth */ (req, res) => scriptHasNFTFunction({ req, res })
);
app.post("/nft", /**auth */ (req, res) => setNFTFunction({ req, res }));
app.get(
  "/nft/purchase/:nftID/:username",
  /**auth */ (req, res) => purchaseNFTFunction({ req, res })
);
app.get(
  "/user/:username/nft",
  /**auth */ (req, res) => getUserNFTFunction({ req, res })
);
app.get("/nft/:id", /**auth */ (req, res) => getNFTFunction({ req, res }));
app.get(
  "/user/:username/wallet",
  /**auth */ (req, res) => getUserWalletFunction({ req, res })
);
app.get(
  "/artist/:userID/portfolio",
  /**auth */ (req, res) => getArtistPortfolioFunction({ req, res })
);
app.post(
  "/nft/merchandise/add",
  /**auth rename*/ (req, res) => appendNFTMerchandiseFunction({ req, res })
);
app.get(
  "/nft/merchandise/:nftID",
  /**auth rename */ (req, res) => getNFTMerchandiseFunction({ req, res })
);

exports.BERNIE = functions.region("europe-west1").https.onRequest(app);
