import React, {useEffect, useState, useContext} from 'react';
import {Alert} from 'react-native';
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

  const handleExchange = ({item, title, artist}: any) => {
    console.log(
      '🚀 ~ file: useWalletExchange.ts ~ line 32 ~ handleExchangeTRAK ~ trak',
      item,
    );
    Alert.alert(
      'Pending TRX Exchange',
      `You are about to swap '${title}' by ${artist} for '${item.title}' by ${item.artist} `,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'EXCHANGE', onPress: () => navigation.navigate('WALLET+')},
      ],
    );
  };

  return {
    bank,
    handleExchange,
  };
};
