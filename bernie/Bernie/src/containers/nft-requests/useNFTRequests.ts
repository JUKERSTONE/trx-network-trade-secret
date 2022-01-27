import React, {useEffect, useState, useContext} from 'react';
import {routes, useAPI} from '../../api';

export const useNFTRequests = ({navigation}: any) => {
  const [NFTRequests, setNFTRequests] = useState(null);
  const {GET} = useAPI();

  useEffect(() => {
    const route = routes.bernie({method: 'nft_requests'});

    const requests = GET({route});
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
