import React, {useEffect, useState, useContext} from 'react';
import {Alert} from 'react-native';
import {useAuthentication} from '../../authentication';
import {api, useAPI} from '../../api';
import {store, refreshWallet, appendWallet} from '../../stores';
import {useTRAKLISTState} from '../..';

const {handleGetState} = useTRAKLISTState();

const keys = handleGetState({index: 'keys'});
const accessToken = keys.trx.accessToken;

export const useExchange = ({navigation, title, artist, id}: any) => {
  const {useGET, usePOST} = useAPI();
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
            //
            const profile = handleGetState({index: 'profile'});
            const user_name = profile.TRX.user_name;

            const route = api.bernie({
              method: 'exchange_trak',
            });

            const exchangeTRAK = usePOST({
              route,
              payload: {boughtID: item.trakID, soldID: id},
              token: accessToken,
            });

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
