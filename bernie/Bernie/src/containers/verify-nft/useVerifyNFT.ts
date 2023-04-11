import React, {useEffect, useState, useContext} from 'react';
import {routes, useAPI} from '../../api';
import storage from '@react-native-firebase/storage';
import {useBERNIEState, handleAcceptTRAK} from '../../app';

const {handleGetState} = useBERNIEState();

const keys = handleGetState({index: 'keys'});
const accessToken = keys.trx.accessToken;

export const useVerifyNFT = ({navigation, route}: any) => {
  const [minted, setMinted] = useState(false);
  const {POST} = useAPI();
  const NFTRequest = {...route.params.item, ...route.params.trak};
  console.log(
    '🚀 ~ file: useVerifyNFT.ts ~ line 8 ~ useVerifyNFT ~ NFTRequest',
    NFTRequest,
  );

  const handleVerifyNFT = async ({NFTRequest}: any) => {
    console.log(
      '🚀 ~ file: useVerifyNFT.ts ~ line 8 ~ handleVerifyNFT ~ NFTRequest',
      NFTRequest,
    );

    // alert('Verify');

    const {success} = await handleAcceptTRAK({payload: NFTRequest});

    if (success) {
      navigation.goBack();
      navigation.navigate('TRX');
    }
  };

  const handleDeclineNFT = ({NFTRequest}: any) => {
    const reference = storage().ref(
      'gs://trx-traklist.appspot.com/requests/trx-00/' + NFTRequest.NFTFileName,
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
