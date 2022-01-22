import { db } from "../../../../firestore";

export const getTRAKBank = ({ req, res }: any) => {
  db.collection("currency")
    .get()
    .then((data: any) => {
      let bank: any = [];
      data.forEach((trak: any) => {
        const {
          createdAt,
          trakID,
          trakURI,
          isNFT,
          isPrimaryTRAK,
          isRare,
          label,
          tier,
          meta: { artist, title, thumbnail },
        } = trak.data();
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
          thumbnail,
          tier,
        });
      });
      return res.json(bank);
    });
};
