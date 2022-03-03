import React, {useEffect, useState, useContext} from 'react';
import {Alert} from 'react-native';
import {useTRAKLISTState} from '../..';
import {useAPI, api} from '../../api';
import {store, refreshWallet, appendWallet} from '../../stores';

export const useWalletTab = ({navigation, title, artist, item, id}: any) => {
  const {handleGetState} = useTRAKLISTState();
  const {useGET, usePOST} = useAPI();

  const keys = handleGetState({index: 'keys'});
  const accessToken = keys.trx.accessToken;

  const handleExchange = ({trak}: any) => {
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

            const route = api.bernie({
              method: 'exchange_trak',
            });

            const exchangeTRAK = usePOST({
              route,
              payload: {boughtID: id, soldID: trak.trakID},
              token: accessToken,
            });
            console.log(
              '🚀 ~ file: useWalletTab.ts ~ line 35 ~ onPress: ~ trak.trakID',
              trak.trakID,
            );
            console.log(
              '🚀 ~ file: useWalletTab.ts ~ line 35 ~ onPress: ~ id',
              id,
            );

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
