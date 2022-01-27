import { db } from "../../../firestore";

export const requestNFT = ({ req, res }: any) => {
  const {
    body: {
      userID,
      trakID,
      proof,
      type,
      trakART,
      trakAUDIO,
      trakIPO,
      title,
      artist,
      thumbnail,
    },
  } = req;

  const verify = {
    userID,
    trakID,
    proof,
    type,
    trakART,
    trakAUDIO,
    trakIPO,
    title,
    artist,
    thumbnail,
  };

  return db
    .doc("/verify" + "/" + trakID)
    .set({ ...verify, trakID })
    .then((doc) => {
      return res.json({
        verify,
        success: true,
      });
    });
};
