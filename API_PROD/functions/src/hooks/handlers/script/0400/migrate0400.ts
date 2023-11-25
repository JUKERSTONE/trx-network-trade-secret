import { db } from "../../../../firestore";
import { TRX_00 } from "../../../../types";
import { handleTRX00SpotifyDependencies } from "../../get";
// import { handleExtraData } from "./handlers/extraData";

export const migrate0400 = async (req: any, res: any) => {
  console.log(
    "🚀 ~ file: migrate0400.ts:8 ~ migrate0400 ~ req.headers:",
    req.headers
  );
  const accessToken = req.headers.authorization.split("Bearer ")[1];
  console.log(
    "🚀 ~ file: migrate0400.ts:8 ~ migrate0400 ~ accessToken:",
    accessToken
  );

  const trx04 = await db
    .collection("trx-04")
    .get()
    .then((data) => {
      let trak: any = [];
      data.forEach((doc) => {
        trak.push(doc.data());
      });
      return trak;
    });

  const test = await Promise.all(
    trx04.map(async (trak: any) => {
      if (!trak.serialized_trak) return;
      const deSerializedTrak = JSON.parse(trak.serialized_trak);
      const spotifyId = deSerializedTrak.TRAK.trak.spotify?.id;
      if (spotifyId && spotifyId !== "local") {
        const { isrc, genres, audioFeatures } =
          await handleTRX00SpotifyDependencies({
            accessToken,
            spotifyId,
          });
        console.log(
          "🚀 ~ file: migrate0400.ts:22 ~ trx04.map ~ isrc, genres, audioFeatures:",
          isrc,
          genres,
          audioFeatures
        );

        // check 00 serialized trak shape
        const updatedSerializedTrak = {
          protocol: `trx:00:${isrc}`,
          TRAK: {
            ...deSerializedTrak.TRAK,
            isrc,
            genres,
            audioFeatures,
          },
        };

        const trx_00: TRX_00 = {
          artist: deSerializedTrak.TRAK.trak.artist,
          audioFeatures,
          genres,
          isrc,
          title: deSerializedTrak.TRAK.trak.title,
          serialized_trak: JSON.stringify(updatedSerializedTrak),
        };
        console.log(
          "🚀 ~ file: migrate0400.ts:67 ~ trx04.map ~ trx_00:",
          trx_00
        );
        return trx_00;

        await db.collection("TRX").doc(`trx:00:${isrc}`).set(trx_00);
        // migrate /fundamentals/TRAKSTAR/streaming
        // migrate /sessions
        // migrate /users/:userId/playback
        // await db.collection("trx-04").doc(trak.id).delete();
        // playbacks & sessions
      }
      return;
    })
  );

  return res.json({ message: "success", test });
};
