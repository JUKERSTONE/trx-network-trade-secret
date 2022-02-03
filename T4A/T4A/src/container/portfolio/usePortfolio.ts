import React, {useEffect, useState, useContext} from 'react';
import {api, useAPI} from '../../api';
import {store, toggleExchangeView} from '../../stores';
import {useT4AState} from '../../';
export const usePortfolio = ({navigation}: any) => {
  console.log(
    '🚀 ~ file: usePortfolio.ts ~ line 6 ~ usePortfolio ~ navigation',
    navigation,
  );
  const {useGET, usePOST} = useAPI();
  const {handleGetState} = useT4AState();
  const [portfolio, setPortfolio] = useState();

  const profile = handleGetState({index: 'profile'});
  const firebase = profile.firebase;
  const userID = firebase.uid;

  useEffect(() => {
    const route: any = api.bernie({
      method: 'get_artist_portfolio',
      payload: {userID},
    });
    console.log(
      '🚀 ~ file: usePortfolio.ts ~ line 18 ~ useEffect ~ route',
      route,
    );

    handleGetPortfolio(route);
  }, []);

  const handleGetPortfolio = async (route: string) => {
    const response = await useGET({route});
    console.log(
      '🚀 ~ file: usePortfolio.ts ~ line 28 ~ handleGetPortfolio ~ response',
      response,
    );
    const data = response.data;
    setPortfolio(data);
  };

  const handleNavigateNFT = ({item}: any) => {
    console.log(
      '🚀 ~ file: usePortfolio.ts ~ line 47 ~ handleNavigateNFT ~ navigation',
      navigation,
    );
    navigation.navigate('NFT_DASHBOARD', item);
  };

  return {
    portfolio,
    handleNavigateNFT,
  };
};
