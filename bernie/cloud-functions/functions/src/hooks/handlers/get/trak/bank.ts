import { db } from "../../../../firestore";

export const getTRAKBank = (req: any, res: any) => {
  db.collection("currency")
    .get()
    .then((data: any) => {
      let bank: any = [];
      data.forEach((product: any) => {
        const trakData = product.data();
        const currency = trakData.currency;

        switch (currency) {
          case "TRX":
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
            } = product.data();
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
            break;
          case "NFT":
            const NFTData = product.data();
            bank.push(NFTData);
            break;
          default:
            console.log("TSB");
        }
      });
      return res.json(bank);
    });
};
