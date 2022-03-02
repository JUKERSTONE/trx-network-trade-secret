import { db } from "../../../../firestore";

export const getTrakBank = (req: any, res: any) => {
  const trakSubCollection = db
    .collection("protocols")
    .doc("trx_00")
    .collection("trak");

  return trakSubCollection.get().then((data: any) => {
    let bank: any = [];
    data.forEach((trak: any) => {
      const trakData = trak.data();

      const {
        artist,
        title,
        cover_art,
        createdAt,
        trakID,
        trakURI,
        isNFT,
        isPrimaryTRAK,
        isRare,
        label,
        tier,
      } = trakData;

      bank.push({
        createdAt,
        trakID,
        trakURI,
        isNFT,
        isPrimaryTRAK,
        isRare,
        label,
        artist,
        title,
        cover_art,
        tier,
      });
    });
    return res.json(bank);
  });
};
