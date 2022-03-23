import React, {useEffect, useState, useContext} from 'react';
import {api, useAPI} from '../../api';
import {store, toggleExchangeView} from '../../stores';
import {useT4AState} from '../..';

const {handleGetState} = useT4AState();

const keys = handleGetState({index: 'keys'});
const accessToken = keys.trx.accessToken;

export const usePortfolio = ({navigation}: any) => {
  console.log(
    '🚀 ~ file: usePortfolio.ts ~ line 6 ~ usePortfolio ~ navigation',
    navigation,
  );
  const {useGET, usePOST} = useAPI();
  const [portfolio, setPortfolio] = useState([]);

  const profile = handleGetState({index: 'profile'});
  const firebase = profile.firebase;
  const userID = firebase.uid;

  useEffect(() => {
    const route: any = api.bernie({
      method: 'get_artist_portfolio',
    });
    console.log(
      '🚀 ~ file: usePortfolio.ts ~ line 18 ~ useEffect ~ route',
      route,
    );

    handleGetPortfolio(route);
  }, []);

  const handleGetPortfolio = async (route: string) => {
    const response = await useGET({route, token: accessToken}).catch(err => {
      console.log(
        '🚀 ~ file: usePortfolio.ts ~ line 37 ~ response ~ accessToken',
        accessToken,
      );
      console.log('🚀 ~ file: usePortfolio.ts ~ line 37 ~ response ~ err', err);
      //
      //
    });
    console.log(
      '🚀 ~ file: usePortfolio.ts ~ line 28 ~ handleGetPortfolio ~ response',
      response,
    );
    const data = response.data;
    console.log(
      '🚀 ~ file: usePortfolio.ts ~ line 50 ~ handleGetPortfolio ~ data',
      data,
    );

    if (data != []) {
      setPortfolio(data);
    }
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
