import { db } from "../../../../firestore";

export const appendNFTMerchandise = ({ req, res }: any) => {
  const {
    body: { title, userID, price, thumbnail, proof },
  } = req;

  return db
    .collection("merchandise")
    .add({ title, userID, price, thumbnail, proof });
};
