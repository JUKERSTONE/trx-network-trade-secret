import { db } from "../../../firestore";

export const exchangeTrak = (req: any, res: any) => {
  const {
    body: { boughtID, soldID },
  } = req;

  const username = req.user.username;
  const userId = req.user.userId;

  return db
    .doc("/protocols/trx_00" + "/trak/" + boughtID)
    .get()
    .then((doc: any) => {
      const trak = doc.data();
      const TRAKDocument = {
        createdAt: new Date(),
        exchangedAt: null,
        trakID: trak.trakID,
        isNFT: trak.isNFT,
        isPrimaryTRAK: trak.isPrimaryTRAK,
        isRare: trak.isRare,
        label: trak.label,
        artist: trak.artist,
        title: trak.title,
        cover_art: trak.cover_art,
        tier: trak.tier,
        hasBlankDisc: false,
        username,
        // userId
      };
      db.doc("/TRAKLIST/" + userId + "/trak/" + boughtID).set(TRAKDocument);
    })
    .then(() => {
      return db
        .doc("/TRAKLIST/" + userId + "/trak/" + soldID)
        .update({ exchangedAt: new Date() })
        .then(() => {
          return res.json("success");
        });
    });
};
