import { db } from "../../../firestore";

export const exchangeTRAK = (req: any, res: any) => {
  const {
    body: { boughtID, soldID },
  } = req;

  const username = req.user.username;

  return db
    .collection("currency")
    .where("trakID", "==", boughtID)
    .limit(1)
    .get()
    .then((data: any) => {
      data.forEach((doc: any) => {
        const trak = doc.data();
        const TRAKDocument = {
          createdAt: new Date(),
          exchangedAt: null,
          trakID: trak.trakID,
          trakURI: trak.trakURI,
          isNFT: trak.isNFT,
          isPrimaryTRAK: trak.isPrimaryTRAK,
          isRare: trak.isRare,
          label: trak.label,
          artist: trak.meta.artist,
          title: trak.meta.title,
          thumbnail: trak.meta.thumbnail,
          tier: trak.tier,
          hasBlankDisc: false,
          username,
        };
        db.collection("trak").add(TRAKDocument);
      });
    })
    .then(() => {
      return db
        .collection("trak")
        .where("username", "==", username)
        .where("trakID", "==", soldID)
        .limit(1)
        .get()
        .then((data: any) => {
          let sold: any = [];

          data.forEach((doc: any) => {
            sold.push(doc);
          });

          const doc = sold[0];

          doc.ref.update({ exchangedAt: new Date() });

          return res.json("success");
        });
    });
};
