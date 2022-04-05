import { db } from "../../../../firestore";

export const getNFTRequests = (req: any, res: any) => {
  const userId = req.user.userId;
  const nftRequestsSubCollection = db
    .collection("requests")
    .doc("trx_00")
    .collection(userId);

  return nftRequestsSubCollection.get().then((data: any) => {
    let requests: any = [];
    data.forEach((doc: any) => {
      requests.push(doc.data());
    });
    return res.json({ requests });
  });
};
