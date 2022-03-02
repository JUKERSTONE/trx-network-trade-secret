import { db } from "../../../firestore";

export const requestNFT = (req: any, res: any) => {
  const {
    body: {
      userID,
      trakID,
      NFTFileName,
      proof,
      type,
      trakPRODUCTS,
      trakIMAGE,
      trakAUDIO,
      trakIPO,
      trakCOPIES,
      trakVALUE,
      trakPRICE,
      title,
      artist,
      cover_art,
    },
  } = req;

  const verify = {
    userID,
    trakID,
    NFTFileName,
    proof,
    type,
    trakIMAGE,
    trakAUDIO,
    trakIPO,
    trakCOPIES,
    title,
    trakVALUE,
    trakPRODUCTS,
    trakPRICE,
    artist,
    cover_art,
  };

  const trakDocument = db.doc("/protocols/trx_00" + "/trak/" + trakID);

  return trakDocument
    .get()
    .then((doc: any) => {
      const trak = doc.data();
      const hasNFT = trak.hasNFT;
      return hasNFT;
    })
    .then((hasNFT) => {
      return db
        .doc("/BERNIE" + "/trx_00/nft/" + trakID)
        .set({ ...verify, hasNFT, trakID })
        .then((doc) => {
          return res.json({
            verify: {
              ...verify,
              hasNFT,
            },
            success: true,
          });
        });
    });
};
