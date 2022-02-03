import { db } from "../../../../firestore";

export const getArtistPortfolio = ({ req, res }: any) => {
  const userID = req.params.userID;

  return db
    .collection("currency")
    .where("minterID", "==", userID)
    .get()
    .then((data: any) => {
      let portfolio: any = [];
      data.forEach((doc: any) => {
        portfolio.push(doc.data());
      });
      return res.json(portfolio);
    });
};
