import React, {useEffect, useState, useContext} from 'react';
import {Alert} from 'react-native';
import {useAuthentication} from '../../authentication';
import {api, useAPI} from '../../api';
import {store, refreshWallet, appendWallet} from '../../stores';
import {useTRAKLISTState} from '../..';

export const useExchange = ({navigation, title, artist, id}: any) => {
  const {useGET} = useAPI();
  const [bank, setBank] = useState(null);
  const {handleGetState} = useTRAKLISTState();

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
    Alert.alert(
      'Pending TRX Exchange',
      `You are about to swap '${title}' by ${artist} for '${item.title}' by ${item.artist} `,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'EXCHANGE',
          onPress: () => {
            const route = api.bernie({
              method: 'exchange_trak',
              payload: {boughtID: item.trakID, soldID: id, user_name: 'Test'},
            });
            console.log(
              '🚀 ~ file: useWalletExchange.ts ~ line 52 ~ handleExchange ~ route',
              route,
            );

            const exchangeTRAK = useGET({route});

            console.log(
              '🚀 ~ file: useWalletExchange.ts ~ line 45 ~ handleExchange ~ exchangeTRAK',
              exchangeTRAK,
            );

            const profile = handleGetState({index: 'profile'});
            console.log(
              '🚀 ~ file: useWalletExchange.ts ~ line 54 ~ handleExchange ~ profile',
              profile,
            );

            const wallet = profile.TRX.wallet;

            const newWallet = wallet.filter((item: any) => {
              return item.trakID != id;
              //
            });

            const action = refreshWallet(newWallet);
            store.dispatch(action);

            const action_2 = appendWallet(item);
            store.dispatch(action_2);

            navigation.navigate('TRX');
          },
        },
      ],
    );
  };

  return {
    bank,
    handleExchange,
  };
};
