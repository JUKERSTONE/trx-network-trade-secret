import { db } from "../../../firestore";

export const raffleTRAK = ({ req, res }: any) => {
  const subscription = req.params.subscription;
  switch (subscription) {
    case "free":
      db.collection("currency")
        .where("meta.is_rare", "==", false)
        .where("meta.tier", "==", "tier_4")
        .limit(25)
        .get()
        .then((data: any) => {
          let tier_4: any = [];
          data.forEach((doc: any) => {
            tier_4.push(doc.data());
          });

          return tier_4;
        })
        .then((tier_4) => {
          db.collection("currency")
            .where("meta.is_rare", "==", false)
            .where("meta.tier", "==", "tier_3")
            .limit(5)
            .get()
            .then((data: any) => {
              let tier_3: any = [];
              data.forEach((doc: any) => {
                tier_3.push(doc.data());
              });
              const trak = {
                tier_3,
                tier_4,
              };
              return res.json(trak);
            });
        });
      break;
    case "basic":
      db.collection("currency")
        .where("meta.is_rare", "==", false)
        .where("meta.tier", "==", "tier_4")
        .limit(40)
        .get()
        .then((data: any) => {
          let tier_4: any = [];
          data.forEach((doc: any) => {
            tier_4.push(doc.data());
          });

          return tier_4;
        })
        .then((tier_4) => {
          db.collection("currency")
            .where("meta.is_rare", "==", false)
            .where("meta.tier", "==", "tier_3")
            .limit(15)
            .get()
            .then((data: any) => {
              let tier_3: any = [];
              data.forEach((doc: any) => {
                tier_3.push(doc.data());
              });

              return tier_3;
            })
            .then((tier_3) => {
              db.collection("currency")
                .where("meta.is_rare", "==", false)
                .where("meta.tier", "==", "tier_2")
                .limit(5)
                .get()
                .then((data: any) => {
                  let tier_2: any = [];
                  data.forEach((doc: any) => {
                    tier_2.push(doc.data());
                  });
                  const trak = {
                    tier_2,
                    tier_3,
                    tier_4,
                  };
                  return res.json(trak);
                });
            });
        });

      break;
    case "pro":
      db.collection("currency")
        .where("meta.is_rare", "==", false)
        .where("meta.tier", "==", "tier_4")
        .limit(60)
        .get()
        .then((data: any) => {
          let tier_4: any = [];
          data.forEach((doc: any) => {
            tier_4.push(doc.data());
          });

          return tier_4;
        })
        .then((tier_4) => {
          db.collection("currency")
            .where("meta.is_rare", "==", false)
            .where("meta.tier", "==", "tier_3")
            .limit(20)
            .get()
            .then((data: any) => {
              let tier_3: any = [];
              data.forEach((doc: any) => {
                tier_3.push(doc.data());
              });

              return tier_3;
            })
            .then((tier_3) => {
              db.collection("currency")
                .where("meta.is_rare", "==", false)
                .where("meta.tier", "==", "tier_2")
                .limit(10)
                .get()
                .then((data: any) => {
                  let tier_2: any = [];
                  data.forEach((doc: any) => {
                    tier_2.push(doc.data());
                  });
                  const trak = {
                    tier_2,
                    tier_3,
                    tier_4,
                  };
                  return res.json(trak);
                });
            });
        });
      break;
    case "musichead":
      db.collection("currency")
        .where("meta.is_rare", "==", false)
        .where("meta.tier", "==", "tier_4")
        .limit(60)
        .get()
        .then((data: any) => {
          let tier_4: any = [];
          data.forEach((doc: any) => {
            tier_4.push(doc.data());
          });

          return tier_4;
        })
        .then((tier_4) => {
          db.collection("currency")
            .where("meta.is_rare", "==", false)
            .where("meta.tier", "==", "tier_3")
            .limit(25)
            .get()
            .then((data: any) => {
              let tier_3: any = [];
              data.forEach((doc: any) => {
                tier_3.push(doc.data());
              });

              return tier_3;
            })
            .then((tier_3) => {
              db.collection("currency")
                .where("meta.is_rare", "==", false)
                .where("meta.tier", "==", "tier_2")
                .limit(10)
                .get()
                .then((data: any) => {
                  let tier_2: any = [];
                  data.forEach((doc: any) => {
                    tier_2.push(doc.data());
                  });

                  return tier_2;
                })
                .then((tier_2) => {
                  db.collection("currency")
                    .where("meta.is_rare", "==", false)
                    .where("meta.tier", "==", "tier_1")
                    .limit(5)
                    .get()
                    .then((data: any) => {
                      let tier_1: any = [];
                      data.forEach((doc: any) => {
                        tier_1.push(doc.data());
                      });

                      const trak = {
                        tier_1,
                        tier_2,
                        tier_3,
                        tier_4,
                      };
                      return res.json(trak);
                    });
                });
            });
        });
      break;
    default:
      return res.json("Invalid Subscription Type");
  }
};
