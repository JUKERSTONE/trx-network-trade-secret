import { db } from "../../../../../firestore";

export const setTrakRaffle = (req: any, res: any) => {
  const subscription = req.params.subscription;
  const username = req.user.username;
  const userId = req.user.userId;

  const trakSubCollection = db
    .collection("protocols")
    .doc("trx_00")
    .collection("trak");

  switch (subscription) {
    case "free":
      let free: any = [];

      trakSubCollection
        .where("isRare", "==", false)
        .where("tier", "==", "tier_4")
        .limit(25)
        .get()
        .then((data: any) => {
          data.forEach((doc: any) => {
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
            };
            free.push(TRAKDocument);
            db.doc("/TRAKLIST/" + userId + "/trak/" + trak.trakID).set(
              TRAKDocument
            );
          });
        })
        .then(() => {
          trakSubCollection
            .where("isRare", "==", false)
            .where("tier", "==", "tier_3")
            .limit(5)
            .get()
            .then((data: any) => {
              data.forEach((doc: any) => {
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
                };
                free.push(TRAKDocument);
                db.doc("/TRAKLIST/" + userId + "/trak/" + trak.trakID).set(
                  TRAKDocument
                );
              });
              return res.json(free);
            });
        });
      break;
    case "basic":
      let basic: any = [];

      trakSubCollection
        .where("isRare", "==", false)
        .where("tier", "==", "tier_4")
        .limit(40)
        .get()
        .then((data: any) => {
          data.forEach((doc: any) => {
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
            };
            basic.push(TRAKDocument);
            db.doc("/TRAKLIST/" + userId + "/trak/" + trak.trakID).set(
              TRAKDocument
            );
          });
        })
        .then(() => {
          trakSubCollection
            .where("isRare", "==", false)
            .where("tier", "==", "tier_3")
            .limit(15)
            .get()
            .then((data: any) => {
              data.forEach((doc: any) => {
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
                };
                basic.push(TRAKDocument);
                db.doc("/TRAKLIST/" + userId + "/trak/" + trak.trakID).set(
                  TRAKDocument
                );
              });
            })
            .then(() => {
              trakSubCollection
                .where("isRare", "==", false)
                .where("tier", "==", "tier_2")
                .limit(5)
                .get()
                .then((data: any) => {
                  data.forEach((doc: any) => {
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
                    };
                    basic.push(TRAKDocument);
                    db.doc("/TRAKLIST/" + userId + "/trak/" + trak.trakID).set(
                      TRAKDocument
                    );
                  });
                  return res.json(basic);
                });
            });
        });

      break;
    case "pro":
      let pro: any = [];

      trakSubCollection
        .where("isRare", "==", false)
        .where("tier", "==", "tier_4")
        .limit(60)
        .get()
        .then((data: any) => {
          data.forEach((doc: any) => {
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
            };
            pro.push(TRAKDocument);
            db.doc("/TRAKLIST/" + userId + "/trak/" + trak.trakID).set(
              TRAKDocument
            );
          });
        })
        .then(() => {
          trakSubCollection
            .where("isRare", "==", false)
            .where("tier", "==", "tier_3")
            .limit(20)
            .get()
            .then((data: any) => {
              data.forEach((doc: any) => {
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
                };
                pro.push(TRAKDocument);
                db.doc("/TRAKLIST/" + userId + "/trak/" + trak.trakID).set(
                  TRAKDocument
                );
              });
            })
            .then(() => {
              trakSubCollection
                .where("isRare", "==", false)
                .where("tier", "==", "tier_2")
                .limit(10)
                .get()
                .then((data: any) => {
                  data.forEach((doc: any) => {
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
                    };
                    pro.push(TRAKDocument);
                    db.doc("/TRAKLIST/" + userId + "/trak/" + trak.trakID).set(
                      TRAKDocument
                    );
                  });

                  return res.json(pro);
                });
            });
        });
      break;
    case "musichead":
      let musichead: any = [];

      trakSubCollection
        .where("isRare", "==", false)
        .where("tier", "==", "tier_4")
        .limit(60)
        .get()
        .then((data: any) => {
          data.forEach((doc: any) => {
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
            };
            musichead.push(TRAKDocument);
            db.doc("/TRAKLIST/" + userId + "/trak/" + trak.trakID).set(
              TRAKDocument
            );
          });
        })
        .then(() => {
          trakSubCollection
            .where("isRare", "==", false)
            .where("tier", "==", "tier_3")
            .limit(25)
            .get()
            .then((data: any) => {
              data.forEach((doc: any) => {
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
                };
                musichead.push(TRAKDocument);
                db.doc("/TRAKLIST/" + userId + "/trak/" + trak.trakID).set(
                  TRAKDocument
                );
              });
            })
            .then(() => {
              trakSubCollection
                .where("isRare", "==", false)
                .where("tier", "==", "tier_2")
                .limit(10)
                .get()
                .then((data: any) => {
                  data.forEach((doc: any) => {
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
                    };
                    musichead.push(TRAKDocument);
                    db.doc("/TRAKLIST/" + userId + "/trak/" + trak.trakID).set(
                      TRAKDocument
                    );
                  });
                })
                .then(() => {
                  trakSubCollection
                    .where("isRare", "==", false)
                    .where("tier", "==", "tier_1")
                    .limit(5)
                    .get()
                    .then((data: any) => {
                      data.forEach((doc: any) => {
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
                        };
                        musichead.push(TRAKDocument);
                        db.doc(
                          "/TRAKLIST/" + userId + "/trak/" + trak.trakID
                        ).set(TRAKDocument);
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
