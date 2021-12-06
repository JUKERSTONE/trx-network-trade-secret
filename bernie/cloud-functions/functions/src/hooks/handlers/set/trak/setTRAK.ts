import { generateTRAKID, generateTRAKURI } from "../../generate";
import { constants } from "../../../../core";

const { trak } = constants;

export const setTRAK = ({ request, response }: any) => {
  const {
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
  } = request.body;

  const trakID = generateTRAKID();
  const trakURI = generateTRAKURI({ trak, type, trakID });

  const trakToken: any = {
    trakID,
    trakURI,
    isrc,
    type,
    isNFT,
    content: {
      trakIPO,
      trakART,
      trakAUDIO,
      trakVIDEO,
    },
    subscriptions,
    web: {
      spotify,
      apple_music,
      genius,
    },
  };

  const symbolizedTRAKToken = Symbol(trakToken);

  //   SEND TO BERNIE DATABASE
  //   SEND TO SOLANA DATABASE
  //   SEND TO FORCHAIN DATABASE
};
