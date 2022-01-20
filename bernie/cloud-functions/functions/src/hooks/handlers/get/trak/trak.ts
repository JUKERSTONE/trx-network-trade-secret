import { db } from "../../../../firestore";

export const getTRAK = ({ req, res }: any) => {
  const id = req.params.id;
  //

  return db
    .collection("currency")
    .where("trakID", "==", id)
    .get()
    .then((data: any) => {
      let trak: any = [];
      data.forEach((doc: any) => {
        trak.push(doc.data());
      });
      return res.json(trak[0]);
    });
};
