import { db } from "../../../firestore";

export const requestNFT = ({ req, res }: any) => {
  const {
    body: {
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
      artist,
      thumbnail,
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
    artist,
    thumbnail,
  };

  const trakDocument = db.doc(`/currency/TRX:${type}:${trakID}`);

  return trakDocument
    .get()
    .then((doc: any) => {
      const trak = doc.data();
      const hasNFT = trak.hasNFT;
      return hasNFT;
    })
    .then((hasNFT) => {
      return db
        .doc("/verify" + "/" + trakID)
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
