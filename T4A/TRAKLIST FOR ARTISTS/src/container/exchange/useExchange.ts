import React, {useEffect, useState, useContext} from 'react';
import {api, useAPI} from '../../api';
import {store, toggleExchangeView} from '../../stores';
import {useT4AState} from '../..';

const {handleGetState} = useT4AState();

const keys = handleGetState({index: 'keys'});
const accessToken = keys.trx.accessToken;

export const useExchange = ({navigation}: any) => {
  const {useGET} = useAPI();
  const [bank, setBank] = useState(null);

  useEffect(() => {
    handleGetBank();
  }, []);

  const handleGetBank = async () => {
    const route = api.bernie({method: 'bank'});
    console.log(
      '🚀 ~ file: useExchange.ts ~ line 10 ~ useEffect ~ route',
      route,
    );

    const response: any = await useGET({route, token: accessToken});
    console.log(
      '🚀 ~ file: useExchange.ts ~ line 16 ~ useEffect ~ response',
      response,
    );
    const data = response.data;
    console.log(
      '🚀 ~ file: useExchange.ts ~ line 32 ~ handleGetBank ~ data',
      data,
    );

    const bank = data.filter((item: any) => !item.isNFT);

    setBank(bank);
  };

  const handleExchangeTRAK = ({item}: any) => {
    console.log(
      '🚀 ~ file: useExchange.ts ~ line 30 ~ handleExchangeTRAK ~ item',
      item,
    );

    navigation.navigate('REDEEM', {
      trak: item,
    });
  };

  return {
    bank,
    handleExchangeTRAK,
  };
};
