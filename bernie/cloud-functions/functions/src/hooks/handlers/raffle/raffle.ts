import { db } from "../../../firestore";

export const raffleTRAK = ({ req, res }: any) => {
  const subscription = req.params.subscription;
  switch (subscription) {
    case "free":
      let free: any = [];

      db.collection("currency")
        .where("isRare", "==", false)
        .where("tier", "==", "tier_4")
        .limit(25)
        .get()
        .then((data: any) => {
          data.forEach((doc: any) => {
            free.push(doc.data());
          });
        })
        .then(() => {
          db.collection("currency")
            .where("isRare", "==", false)
            .where("tier", "==", "tier_3")
            .limit(5)
            .get()
            .then((data: any) => {
              data.forEach((doc: any) => {
                free.push(doc.data());
              });

              return res.json(free);
            });
        });
      break;
    case "basic":
      let basic: any = [];

      db.collection("currency")
        .where("isRare", "==", false)
        .where("tier", "==", "tier_4")
        .limit(40)
        .get()
        .then((data: any) => {
          data.forEach((doc: any) => {
            basic.push(doc.data());
          });
        })
        .then(() => {
          db.collection("currency")
            .where("isRare", "==", false)
            .where("tier", "==", "tier_3")
            .limit(15)
            .get()
            .then((data: any) => {
              data.forEach((doc: any) => {
                basic.push(doc.data());
              });
            })
            .then(() => {
              db.collection("currency")
                .where("isRare", "==", false)
                .where("tier", "==", "tier_2")
                .limit(5)
                .get()
                .then((data: any) => {
                  data.forEach((doc: any) => {
                    basic.push(doc.data());
                  });

                  return res.json(basic);
                });
            });
        });

      break;
    case "pro":
      let pro: any = [];

      db.collection("currency")
        .where("isRare", "==", false)
        .where("tier", "==", "tier_4")
        .limit(60)
        .get()
        .then((data: any) => {
          data.forEach((doc: any) => {
            pro.push(doc.data());
          });
        })
        .then(() => {
          db.collection("currency")
            .where("isRare", "==", false)
            .where("tier", "==", "tier_3")
            .limit(20)
            .get()
            .then((data: any) => {
              data.forEach((doc: any) => {
                pro.push(doc.data());
              });
            })
            .then(() => {
              db.collection("currency")
                .where("isRare", "==", false)
                .where("tier", "==", "tier_2")
                .limit(10)
                .get()
                .then((data: any) => {
                  data.forEach((doc: any) => {
                    pro.push(doc.data());
                  });

                  return res.json(pro);
                });
            });
        });
      break;
    case "musichead":
      let musichead: any = [];

      db.collection("currency")
        .where("isRare", "==", false)
        .where("tier", "==", "tier_4")
        .limit(60)
        .get()
        .then((data: any) => {
          data.forEach((doc: any) => {
            musichead.push(doc.data());
          });
        })
        .then(() => {
          db.collection("currency")
            .where("isRare", "==", false)
            .where("tier", "==", "tier_3")
            .limit(25)
            .get()
            .then((data: any) => {
              data.forEach((doc: any) => {
                musichead.push(doc.data());
              });
            })
            .then(() => {
              db.collection("currency")
                .where("isRare", "==", false)
                .where("tier", "==", "tier_2")
                .limit(10)
                .get()
                .then((data: any) => {
                  data.forEach((doc: any) => {
                    musichead.push(doc.data());
                  });
                })
                .then(() => {
                  db.collection("currency")
                    .where("isRare", "==", false)
                    .where("tier", "==", "tier_1")
                    .limit(5)
                    .get()
                    .then((data: any) => {
                      data.forEach((doc: any) => {
                        musichead.push(doc.data());
                      });

                      return res.json(musichead);
                    });
                });
            });
        });
      break;
    default:
      return res.json("Invalid Subscription Type");
  }
};
