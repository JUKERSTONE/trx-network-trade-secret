// import { collection, addDoc } from "@firebase/firestore";
import { generateTRAKID, generateTRAKURI } from "../../generate";
import { verifyCentralized } from "../../verify";
import { validateSetTRAK } from "../../validate";

import { db } from "../../../../firestore";
import { constants } from "../../../../core";

const { trak } = constants;

export const setTRAK = ({ res, req, ...props }: any) => {
  const {
    body: {
      isrc = null /** REQUIRED */,
      type = null /** REQUIRED */,
      isNFT = null /** REQUIRED */,
      currency = null /** REQUIRED */,
      trakIPO = null,
      trakART = null,
      trakAUDIO = null,
      trakVIDEO = null,
      subscriptions = null,
      spotify = null /** REQUIRED */,
      apple_music = null,
      genius = null,
    },
  } = req;

  const requiredProps = [isrc, type, isNFT, spotify, currency];
  const isValid = validateSetTRAK(requiredProps);

  switch (isValid) {
    case true:
      const forchainHash = "generateTRAKID()";
      const solanaHash = "generateTRAKID()";
      const trakID = generateTRAKID();
      const trakURI = generateTRAKURI({ trak, type, trakID });
      const centralized = [spotify, apple_music, genius];
      const missingCentralizedPrimary: any[] = verifyCentralized(centralized);

      const trakToken: any = {
        forchainHash,
        solanaHash,
        trakID,
        trakURI,
        subscriptions,
        isrc,
        type,
        currency,
        missingCentralizedPrimary,
        isNFT,
        web: {
          spotify,
          apple_music,
          genius,
        },
        content: {
          trakIPO,
          trakART,
          trakAUDIO,
          trakVIDEO,
        },
      };
      console.log(
        "🚀 ~ file: setTRAK.ts ~ line 39 ~ setTRAK ~ trakToken",
        trakToken
      );

      const isStillValid = validateSetTRAK(requiredProps);

      switch (isStillValid) {
        case true:
          // const symbolizedTRAKToken = Symbol(trakToken);

          return db
            .doc("/currency" + "/" + trakURI)
            .set(trakToken)
            .then((doc) => {
              return res.json({
                // symbolizedTRAKToken: JSON.stringify(symbolizedTRAKToken),
                trakToken,
                success: true,
              });
            });

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

  // res.json("trakToken");

  //   SEND TO BERNIE DATABASE
  //   SEND TO SOLANA DATABASE
  //   SEND TO FORCHAIN DATABASE
};
