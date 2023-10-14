import { db } from "../../../../../firestore";

export const setTrak = (req: any, res: any) => {
  const {
    body: { protocol, TRAK },
  } = req;

  switch (protocol) {
    case "trx-00":
      return db
        .doc(`/TRX/trx:00:${TRAK.isrc}`)
        .set({
          artist: TRAK.trak.artist,
          title: TRAK.trak.title,
          isrc: TRAK.isrc,
          serializedTrak: JSON.stringify({ protocol, TRAK }),
        })
        .then(() => {
          return res.json({
            success: true,
          });
        })
        .catch((error) => res.json("Error - Could not set TRAK"));
    case "trx-04":
      return db
        .doc(`/trx-04/${TRAK.trak.youtube.url.split("=")[1]}`)
        .set({
          artist: TRAK.trak.artist,
          title: TRAK.trak.title,
          serializedTrak: JSON.stringify({ protocol, TRAK }),
          ytid: TRAK.trak.youtube.url.split("=")[1],
        })
        .then(() => {
          return res.json({
            success: true,
          });
        })
        .catch((error) => res.json("Error - Could not set TRAK"));
    default:
      return;
  }
};
