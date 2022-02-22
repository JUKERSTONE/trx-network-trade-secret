import { db } from "../../../../firestore";

export const getArtistPortfolio = (req: any, res: any) => {
  const userID = req.user.userId;

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
