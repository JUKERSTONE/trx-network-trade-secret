import { db } from "../../../../firestore";

export const getUserWallet = (req: any, res: any) => {
  const username = req.params.username;

  return db
    .collection("trak")
    .where("username", "==", username)
    .where("exchangedAt", "==", null)
    .get()
    .then((data: any) => {
      let wallet: any[] = [];
      data.forEach((doc: any) => {
        const data = doc.data();
        wallet.push(data);
      });

      db.collection("nft")
        .where("username", "==", username)
        .where("exchangedAt", "==", null)
        .get()
        .then((data: any) => {
          data.forEach((doc: any) => {
            const data = doc.data();
            wallet.push(data);
          });
          res.json(wallet);
        });

      // console.log("🚀 ~ file: trak.ts ~ line 12 ~ .then ~ data", data);
    });
};
