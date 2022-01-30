import { db } from "../../../firestore";

export const purchaseNFT = ({ res, req }: any) => {
  const nftID = req.params.nftID;
  const username = req.params.username;

  return db
    .collection("currency")
    .where("nftID", "==", nftID)
    .limit(1)
    .get()
    .then((data: any) => {
      data.forEach((doc: any) => {
        const nft = doc.data();
        const NFTDocument = {
          purhcasedAt: new Date(),
          exchangedAt: null,
          isNFT: nft.isNFT,
          nft: nft.nft,
          minterID: nft.minterID,
          nftID: nft.nftID,
          nftURI: nft.nftURI,
          username,
        };
        db.collection("nft").add(NFTDocument);
        return res.json(NFTDocument);
      });
    });
};
