import React, {useEffect, useState, useContext} from 'react';
import {routes, useAPI} from '../../api';
import storage from '@react-native-firebase/storage';
import {useBERNIEState} from '../../app';

const {handleGetState} = useBERNIEState();

const keys = handleGetState({index: 'keys'});
const accessToken = keys.trx.accessToken;

export const useVerifyNFT = ({navigation, route}: any) => {
  const {POST} = useAPI();
  const NFTRequest = route.params.item;
  console.log(
    '🚀 ~ file: useVerifyNFT.ts ~ line 8 ~ useVerifyNFT ~ NFTRequest',
    NFTRequest,
  );

  const handleVerifyNFT = ({NFTRequest}: any) => {
    console.log(
      '🚀 ~ file: useVerifyNFT.ts ~ line 8 ~ handleVerifyNFT ~ NFTRequest',
      NFTRequest,
    );
    const hasNFT = NFTRequest.hasNFT;
    const minterID = NFTRequest.userID;
    const trakIDRef = NFTRequest.trakID;
    const trakURIRef = 'TRX:' + NFTRequest.type + ':' + trakIDRef;
    const trakIPO = NFTRequest.trakIPO;
    const trakIMAGE = NFTRequest.trakIMAGE;
    const trakAUDIO = NFTRequest.trakAUDIO;
    const trakCOPIES = NFTRequest.trakCOPIES;
    const trakTITLE = NFTRequest.title;
    const trakARTIST = NFTRequest.artist;
    // alert('Verify');

    switch (hasNFT) {
      case true:
        alert('decline');
        break;
      case false:
        // alert('create new TRAK with isNFT an no hasNFT - props');

        const NFTProps = {
          type: 'track',
          isNFT: true,
          currency: 'NFT',
          trakIDRef,
          trakURIRef,
          trakIMAGE,
          trakAUDIO,
          trakTITLE,
          trakARTIST,
          trakCOPIES,
          trakIPO,
          minterID,
        };
        console.log(
          '🚀 ~ file: useVerifyNFT.ts ~ line 36 ~ handleVerifyNFT ~ NFTProps',
          NFTProps,
        );

        const route = routes.bernie({method: 'set_nft'});
        const response = POST({
          route,
          token: accessToken,
          body: NFTProps,
          ContentType: 'application/json',
        })
          .then(() => {
            alert('NFT minted');
          })
          .catch(error => {
            alert('NFT not minted');
          });
        console.log(
          '🚀 ~ file: useVerifyNFT.ts ~ line 50 ~ handleVerifyNFT ~ response',
          response,
        );

        break;
    }
  };

  const handleDeclineNFT = () => {
    const reference = storage().ref(
      'gs://trx-traklist.appspot.com/requests/trx-00/Adele_Can I Get It_HRrTwWy9rHYQp9Fg3BgbJM5BzHA2',
    );
    console.log(
      '🚀 ~ file: useVerifyNFT.ts ~ line 73 ~ handleDeclineNFT ~ reference',
      reference,
    );
    return reference.delete().then(() => {
      //
      //
    });
  };

  return {
    NFTRequest,
    handleVerifyNFT,
    handleDeclineNFT,
  };
};
