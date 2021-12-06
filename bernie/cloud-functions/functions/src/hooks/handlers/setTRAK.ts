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

  const trakID = "";
  const trakURI = "";

  const TRAK = {
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

  //   SEND TO BERNIE DATABASE
  //   SEND TO SOLANA DATABASE
  //   SEND TO FORCHAIN DATABASE
};
