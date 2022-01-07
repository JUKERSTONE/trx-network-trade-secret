import { generateTRAKID, generateTRAKURI } from "../../generate";
import { verifyCentralized } from "../../verify";
import { validateSetTRAK } from "../../validate";

import { db } from "../../../../firestore";

export const setTRAK = ({ res, req }: any) => {
  const {
    body: {
      isrc = null,
      isPrimaryTRAK = null /** REQUIRED */,
      type = null /** REQUIRED */,
      isNFT = null /** REQUIRED */,
      currency = null /** REQUIRED */,
      label = null /** REQUIRED */,
      isRare = null /** REQUIRED */,
      tier = null /** REQUIRED */,
      trakIPO = null,
      trakART = null,
      trakAUDIO = null,
      trakVIDEO = null,
      spotify = null,
      apple_music = null,
      genius = null,
      soundcloud = null,
      youtube = null,
      meta = null /** REQUIRED */,
    },
  } = req;

  const requiredProps = [
    isPrimaryTRAK,
    type,
    isNFT,
    currency,
    label,
    isRare,
    tier,
    meta,
  ];
  const isValid = validateSetTRAK(requiredProps);

  switch (isValid) {
    case true:
      const forchainHash = "#forchain";
      const solanaHash = "#solana";
      const trakID = generateTRAKID();
      const trakURI = generateTRAKURI({ currency, type, trakID });
      const centralized = [spotify, apple_music, genius, soundcloud, youtube];
      const missingCentralizedPrimary: any[] = verifyCentralized(centralized);

      const trakToken: any = {
        forchainHash,
        solanaHash,
        isPrimaryTRAK,
        trakID,
        trakURI,
        isrc,
        type,
        currency,
        missingCentralizedPrimary,
        isNFT,
        label,
        isRare,
        tier,
        web: {
          spotify,
          apple_music,
          genius,
          youtube,
          soundcloud,
        },
        nft: {
          trakIPO,
          trakART,
          trakAUDIO,
          trakVIDEO,
        },
        meta,
        createdAt: new Date().toString(),
      };

      const isStillValid = validateSetTRAK(requiredProps);

      switch (isStillValid) {
        case true:
          return db
            .doc("/currency" + "/" + trakURI)
            .set(trakToken)
            .then((doc) => {
              return res.json({
                trakToken,
                success: true,
              });
            })
            .catch((error) => res.json("Error - Could not set TRAK"));

        case false:
          return res.json("Invalid TRAK - Will not publish TRAK");
        default:
          return res.json("Invalid TRAK");
      }
    case false:
      return res.json("Invalid TRAK props - Will not publish TRAK");
    default:
      return res.json("Invalid TRAK props");
  }

  //   SEND TO SOLANA DATABASE
  //   SEND TO FORCHAIN DATABASE
};
