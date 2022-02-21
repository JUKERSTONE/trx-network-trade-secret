import React, {useEffect, useState, useContext} from 'react';
import {routes, useAPI} from '../../api';
import {useBERNIEState} from '../../app';

const {handleGetState} = useBERNIEState();

const keys = handleGetState({index: 'keys'});
const accessToken = keys.trx.accessToken;

export const useNFTRequests = ({navigation}: any) => {
  const [NFTRequests, setNFTRequests] = useState(null);
  const {GET} = useAPI();

  useEffect(() => {
    const route = routes.bernie({method: 'nft_requests'});

    const requests = GET({route, token: accessToken});
    console.log(
      '🚀 ~ file: useVerifyNFT.ts ~ line 12 ~ useEffect ~ response',
      requests,
    );
    Promise.resolve(requests).then((response: any) => {
      const data = response.data;
      const requests = data.requests;
      console.log(
        '🚀 ~ file: useVerifyNFT.ts ~ line 19 ~ Promise.resolve ~ data',
        data,
      );
      setNFTRequests(requests);
    });
  }, []);

  const handleNFTRequest = ({item}: any) => {
    navigation.navigate('VERIFY_NFT', {item});
  };

  return {
    NFTRequests,
    handleNFTRequest,
  };
};
