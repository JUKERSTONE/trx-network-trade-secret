import { db } from "../../../../firestore";

export const appendNFTMerchandise = ({ req, res }: any) => {
  const {
    body: { title, minterID, nftID, price, thumbnail, proof },
  } = req;

  return db
    .collection("merchandise")
    .add({ title, minterID, price, thumbnail, proof, nftID });
};
