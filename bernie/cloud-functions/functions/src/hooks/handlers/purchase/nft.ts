import { db } from "../../../firestore";

export const purchaseNFT = (req: any, res: any) => {
  const id = req.params.nftID;
  const username = req.user.username;
  const userId = req.user.userId;
  const forchainId = req.user.forchainId;

  return db
    .doc("/protocols/trx_00" + "/nft/" + id)
    .get()
    .then((doc: any) => {
      const nft = doc.data();
      const NFTDocument = {
        purchasedAt: new Date(),
        exchangedAt: null,
        isNFT: nft.isNFT,
        nft: nft.nft,
        minterID: nft.minterID,
        nftID: nft.nftID,
        username,
      };
      db.doc("/TRAKLIST/" + userId + "/nft/" + id).set(NFTDocument);
      return nft;
    })
    .then((nftDoc: any) => {
      const nftItem = nftDoc.nft;

      const updatedNFTItem = {
        ...nftItem,
        trakCOPIES: nftItem.trakCOPIES !== 0 ? nftItem.trakCOPIES - 1 : 0,
        trakPRICE: nftItem.trakPRICE + nftItem.trakIPO * 0.03,
        trakVALUE: nftItem.trakVALUE + nftItem.trakIPO,
      };

      db.doc("/protocols/trx_00" + "/nft/" + id)
        .update({ nft: updatedNFTItem })
        .then(() => {
          const traklistThursdays = {
            ...updatedNFTItem,
            forchainId,
          };
          db.collection("traklist_thursdays").add(traklistThursdays);
          return res.json({ ...nftDoc, nft: updatedNFTItem, forchainId });
        })
        .catch((error: any) => {
          return res.json("not updated");
        });
    });
};
