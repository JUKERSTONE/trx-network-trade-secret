import React, {useEffect, useState, useContext} from 'react';
import {useAuthentication} from '../../authentication';
import {api, useAPI} from '../../api';
import {store, toggleExchangeView} from '../../stores';

export const useExchange = ({navigation}: any) => {
  const {useGET} = useAPI();
  const [bank, setBank] = useState(null);

  useEffect(() => {
    handleGetBank();
  }, []);

  const handleGetBank = async () => {
    const route = api.bernie({method: 'bank'});
    const response: any = await useGET({route});
    const data = response.data;
    setBank(data);
  };

  const handleExchange = ({item}: any) => {
    const modal = {
      type: 'exchange',
      exchange: {
        active: true,
        mode: 'exchange',
        item,
      },
    };
    const action = toggleExchangeView(modal);
    store.dispatch(action);
  };

  return {
    bank,
    handleExchange,
  };
};
