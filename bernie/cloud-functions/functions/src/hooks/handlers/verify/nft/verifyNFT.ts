import { db } from "../../../../firestore";
import { generateTRAKURI } from "../../generate";

export const verifyNFT = ({ req, res }: any) => {
  const {
    body: { userID, trakID, proof, type },
  } = req;

  const verify = { userID, trakID, proof };

  const trakURI = generateTRAKURI({ currency: "NFT", type, trakID });

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
