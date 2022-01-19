import { db } from "../../../firestore";

export const getUser = ({ req, res }: any) => {
  return res.json(req.user.username);
  db.doc(`/users/${req.user.username}`)
    .get()
    .then((doc) => {
      return doc.data();
      // if (doc.exists) {
      //   userData.credentials = doc.data();
      //   return db
      //     .collection("likes")
      //     .where("username", "==", req.user.username)
      //     .get();
      // }
      // return;
    });
};
