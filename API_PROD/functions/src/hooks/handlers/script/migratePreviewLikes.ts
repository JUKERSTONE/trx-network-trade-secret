import { db } from "../../../firestore";

export const migratePreviewLikes = async ({ req, res }: any) => {
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
      const isrc = like?.isrc;

      if (!!isrc) {
        // logic
      }
    })
  );

  return res.json({ message: "success" });
};
