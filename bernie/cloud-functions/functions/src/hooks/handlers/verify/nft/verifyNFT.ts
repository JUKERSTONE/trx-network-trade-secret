import { db } from "../../../../firestore";
import { generateURI } from "../../generate";

export const verifyNFT = ({ req, res }: any) => {
  const {
    body: { userID, trakID, proof, type },
  } = req;

  const verify = { userID, trakID, proof };

  const trakURI = generateURI({ currency: "NFT", type, trakID });

  return db
    .doc("/verify" + "/" + trakURI)
    .set(verify)
    .then((doc) => {
      return res.json({
        verify,
        success: true,
      });
    });
};
