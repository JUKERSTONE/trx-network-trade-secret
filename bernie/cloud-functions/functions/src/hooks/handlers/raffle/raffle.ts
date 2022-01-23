import { db } from "../../../firestore";

export const raffleTRAK = ({ req, res }: any) => {
  const subscription = req.params.subscription;
  const username = req.params.username;
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
            const trak = doc.data();
            const TRAKDocument = {
              createdAt: new Date(),
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
            free.push(TRAKDocument);
            db.collection("trak").add(TRAKDocument);
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
                const trak = doc.data();
                const TRAKDocument = {
                  createdAt: new Date(),
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
                free.push(TRAKDocument);
                db.collection("trak").add(TRAKDocument);
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
            const trak = doc.data();
            const TRAKDocument = {
              createdAt: new Date(),
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
            basic.push(TRAKDocument);
            db.collection("trak").add(TRAKDocument);
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
                const trak = doc.data();
                const TRAKDocument = {
                  createdAt: new Date(),
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
                basic.push(TRAKDocument);
                db.collection("trak").add(TRAKDocument);
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
                    const trak = doc.data();
                    const TRAKDocument = {
                      createdAt: new Date(),
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
                    basic.push(TRAKDocument);
                    db.collection("trak").add(TRAKDocument);
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
            const trak = doc.data();
            const TRAKDocument = {
              createdAt: new Date(),
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
            pro.push(TRAKDocument);
            db.collection("trak").add(TRAKDocument);
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
                const trak = doc.data();
                const TRAKDocument = {
                  createdAt: new Date(),
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
                pro.push(TRAKDocument);
                db.collection("trak").add(TRAKDocument);
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
                    const trak = doc.data();
                    const TRAKDocument = {
                      createdAt: new Date(),
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
                    pro.push(TRAKDocument);
                    db.collection("trak").add(TRAKDocument);
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
            const trak = doc.data();
            const TRAKDocument = {
              createdAt: new Date(),
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
            musichead.push(TRAKDocument);
            db.collection("trak").add(TRAKDocument);
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
                const trak = doc.data();
                const TRAKDocument = {
                  createdAt: new Date(),
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
                musichead.push(TRAKDocument);
                db.collection("trak").add(TRAKDocument);
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
                    const trak = doc.data();
                    const TRAKDocument = {
                      createdAt: new Date(),
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
                    musichead.push(TRAKDocument);
                    db.collection("trak").add(TRAKDocument);
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
                        const trak = doc.data();
                        const TRAKDocument = {
                          createdAt: new Date(),
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
                        musichead.push(TRAKDocument);
                        db.collection("trak").add(TRAKDocument);
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
