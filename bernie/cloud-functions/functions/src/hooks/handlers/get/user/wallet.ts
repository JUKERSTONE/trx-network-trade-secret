import { db } from "../../../../firestore";

export const getUserWallet = (req: any, res: any) => {
  const userId = req.user.userId;

  const trakSubCollection = db
    .collection("TRAKLIST")
    .doc(userId)
    .collection("trak");

  return trakSubCollection
    .where("exchangedAt", "==", null)
    .get()
    .then((data: any) => {
      let wallet: any[] = [];
      data.forEach((doc: any) => {
        const data = doc.data();
        wallet.push(data);
      });
      return res.json(wallet);

      // console.log("🚀 ~ file: trak.ts ~ line 12 ~ .then ~ data", data);
    });
};
