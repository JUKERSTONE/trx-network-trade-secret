import { generateID, generateURI } from "../../generate";
import { validateSetTRAK } from "../../validate";

import { db } from "../../../../firestore";

export const setNFT = (req: any, res: any) => {
  const {
    body: {
      type = null /** REQUIRED */,
      isNFT = null /** REQUIRED */,
      currency = null /** REQUIRED */,
      trakIPO = null /** REQUIRED */,
      trakIMAGE = null /** REQUIRED */,
      trakAUDIO = null /** REQUIRED */,
      trakTITLE = null /** REQUIRED */,
      trakARTIST = null /** REQUIRED */,
      trakCOPIES = null /** REQUIRED */,
      trakPRODUCTS = null /** REQUIRED */,
      trakURIRef = null /** REQUIRED */,
      trakIDRef = null /** REQUIRED */,
      minterID = null /** REQUIRED */,
    },
  } = req;

  const requiredProps = [
    type,
    isNFT,
    currency,
    trakIMAGE,
    trakAUDIO,
    trakIPO,
    trakTITLE,
    trakARTIST,
    trakCOPIES,
    trakPRODUCTS,
    minterID,
    trakIDRef,
    trakURIRef,
  ];

  const isValid = validateSetTRAK(requiredProps);

  switch (isValid) {
    case true:
      const forchainHash = "#forchain";
      const solanaHash = "#solana";
      const nftID = generateID();
      const nftURI = generateURI({ currency, type, ID: nftID });

      const nftToken: any = {
        forchainHash,
        solanaHash,
        nftID,
        nftURI,
        trakIDRef,
        trakURIRef,
        type,
        currency,
        isNFT,
        nft: {
          trakTITLE,
          trakARTIST,
          trakIPO,
          trakIMAGE,
          trakAUDIO,
          trakCOPIES,
          trakPRODUCTS,
        },
        minterID,
        createdAt: new Date().toString(),
      };

      const isStillValid = validateSetTRAK(requiredProps);

      switch (isStillValid) {
        case true:
          return db
            .doc("/currency" + "/" + nftURI)
            .set(nftToken)
            .then((doc) => {
              const trakDocument = db.doc("/currency" + "/" + trakURIRef);
              trakDocument.get().then((doc: any) => {
                doc.ref.update({ hasNFT: true });
              });

              return res.json({
                nftToken,
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
