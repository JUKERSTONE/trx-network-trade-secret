import React, {useEffect, useState, useContext} from 'react';
import {Alert} from 'react-native';
import {useTRAKLISTState} from '../..';
import {useAPI, api} from '../../api';
import {store, refreshWallet, appendWallet} from '../../stores';

export const useWalletTab = ({navigation, title, artist, item, id}: any) => {
  console.log('🚀 ~ file: useWalletTab.ts ~ line 8 ~ useWalletTab ~ id', id);
  const {handleGetState} = useTRAKLISTState();
  const {useGET} = useAPI();

  const handleExchange = ({trak}: any) => {
    console.log(
      '🚀 ~ file: useWalletTab.ts ~ line 13 ~ handleExchange ~ trak',
      trak,
    );
    Alert.alert(
      'Pending TRX Exchange',
      `You are about to swap '${title}' by ${artist} for '${trak.title}' by ${trak.artist}`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'EXCHANGE',
          onPress: async () => {
            //
            const profile = handleGetState({index: 'profile'});
            const user_name = profile.TRX.user_name;
            console.log(
              '🚀 ~ file: useWalletExchange.ts ~ line 40 ~ handleExchange ~ user_name',
              user_name,
            );

            const route = api.bernie({
              method: 'exchange_trak',
              payload: {boughtID: id, soldID: trak.trakID, user_name},
            });
            console.log(
              '🚀 ~ file: useWalletExchange.ts ~ line 52 ~ handleExchange ~ route',
              route,
            );

            useGET({route});

            const wallet = profile.TRX.wallet;

            const newWallet = wallet.filter((item: any) => {
              return item.trakID != trak.trakID;
            });

            const action = refreshWallet(newWallet);
            store.dispatch(action);

            const action_2 = appendWallet(item);
            store.dispatch(action_2);

            navigation.navigate('WALLET+');
          },
        },
      ],
    );
  };

  return {
    handleExchange,
  };
};
