import React, {useEffect, useState, useContext} from 'react';
import {useAuthentication} from '../../authentication';
import {api, useAPI} from '../../api';

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

    const response: any = await useGET({route});
    console.log(
      '🚀 ~ file: useExchange.ts ~ line 16 ~ useEffect ~ response',
      response,
    );
    const data = response.data;
    setBank(data);
  };

  return {
    bank,
  };
};
