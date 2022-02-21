import { db } from "../../../../firestore";

export const getNFTRequests = (req: any, res: any) => {
  return db
    .collection("verify")
    .get()
    .then((data) => {
      let requests: any = [];
      data.forEach((doc: any) => {
        requests.push(doc.data());
      });
      return res.json({ requests });
    });
};
