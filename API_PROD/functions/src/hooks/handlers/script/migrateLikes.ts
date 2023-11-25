import { db } from "../../../firestore";

export const migrateLikes = async ({ req, res }: any) => {
  const likes = await db
    .collection("likes")
    .get()
    .then((data) => {
      let likes: any = [];
      data.forEach((doc) => {
        likes.push(doc.data());
      });
      return likes;
    });

  await Promise.all(
    likes.map(async (like: any) => {
      const trx = like?.trx04;

      if (!!trx) {
        const trx04: any = await db
          .doc(`/trx-04/${trx}`)
          .get()
          .then((doc) => {
            return doc.data();
          });

        const trak = JSON.parse(trx04.serialized_trak);
        console.log(
          "🚀 ~ file: migrateLikes.ts:30 ~ test ~ trak:",
          trak.TRAK.trak
        );
        const innerTrak = trak.TRAK.trak;

        await db
          .collection("temp-likes")
          .doc(`${like.userId}:${trx.split(":")[2]}`)
          .set({ ...innerTrak, userId: like.userId });
      }
    })
  );

  return res.json({ message: "success" });
};
