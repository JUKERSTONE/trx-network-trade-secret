import { db } from "../../../../firestore";

export const getTrak = (req: any, res: any) => {
  const trakId = req.params.trakId;

  return db
    .doc("/protocols/trx_00" + "/trak/" + trakId)
    .get()
    .then((doc: any) => {
      return res.json(doc.data());
    });
};
