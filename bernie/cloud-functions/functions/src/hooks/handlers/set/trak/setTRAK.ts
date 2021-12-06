import { generateTRAKID, generateTRAKURI } from "../../generate";
import { verifyCentralized } from "../../verify";
import { validateSetTRAK } from "../../validate";

import { constants } from "../../../../core";

const { trak } = constants;

export const setTRAK = ({ request, response }: any) => {
  const {
    body: {
      isrc,
      type,
      isNFT,
      trakIPO,
      trakART,
      trakAUDIO,
      trakVIDEO,
      subscriptions,
      spotify,
      apple_music,
      genius,
    },
  } = request;

  // const {
  //   isrc /** NEED */,
  //   type /** NEED */,
  //   isNFT /** NEED */,
  //   trakIPO,
  //   trakART,
  //   trakAUDIO,
  //   trakVIDEO,
  //   subscriptions,
  //   spotify /** NEED */,
  //   apple_music,
  //   genius,
  // } = body;

  const requiredProps = [isrc, type, isNFT, spotify];
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

      const symbolizedTRAKToken = Symbol(trakToken);

      //   SEND TO BERNIE DATABASE
      //   SEND TO SOLANA DATABASE
      //   SEND TO FORCHAIN DATABASE
      break;
    case false:
      console.log("Invalid TRAK props");
      break;
  }
};
