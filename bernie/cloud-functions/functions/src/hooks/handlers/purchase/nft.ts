import { db } from "../../../firestore";

export const purchaseNFT = (req: any, res: any) => {
  const nftID = req.params.nftID;
  const username = req.user.username;

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
      });
    })
    .then(() => {
      const nftDoc = db.doc("/currency/NFT:track:" + nftID);
      return nftDoc.get().then((data: any) => {
        const nftDocument = data.data();
        const nftItem = nftDocument.nft;

        const updatedNFTItem = {
          ...nftItem,
          trakCOPIES: nftItem.trakCOPIES !== 0 ? nftItem.trakCOPIES - 1 : 0,
          trakPRICE: nftItem.trakPRICE + nftItem.trakIPO * 0.03,
          trakVALUE: nftItem.trakVALUE + nftItem.trakIPO,
        };

        nftDoc
          .update({ nft: updatedNFTItem })
          .then(() => {
            return res.json("nft purchased");
          })
          .catch((error) => {
            return res.json("not updated");
          });
      });
    });
};
