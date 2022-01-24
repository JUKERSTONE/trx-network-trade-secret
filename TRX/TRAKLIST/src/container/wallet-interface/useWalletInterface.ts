import React, {useEffect, useState, useContext} from 'react';
import {useAuthentication} from '../../authentication';
import {useTRAKLISTState} from '../../app';
import {Alert} from 'react-native';
import {toggleExchangeView, store} from '../../stores';

export const useWalletInterface = ({navigation}: any) => {
  const {handleGetState} = useTRAKLISTState();
  const [wallet, setWallet] = useState([]);
  const [trak, setTRAK] = useState(null);

  useEffect(() => {
    const profile = handleGetState({index: 'profile'});
    const TRXProfile = profile.TRX;
    console.log(
      '🚀 ~ file: useWalletInterface.ts ~ line 12 ~ useEffect ~ profile',
      TRXProfile,
    );

    if (TRXProfile == null) {
      setTimeout(() => {
        const profile = handleGetState({index: 'profile'});
        const TRXProfile = profile.TRX;
        const trak = TRXProfile?.trak;

        const wallet = trak?.map((trak: any) => ({
          value: trak.title,
          key: trak.trakURI,
        }));
        setWallet(wallet);
        setTRAK(trak);
      }, 4000);
    } else {
      const trak = TRXProfile?.trak;

      const wallet = trak?.map((trak: any) => ({
        value: trak.title,
        key: trak.trakURI,
      }));

      setWallet(wallet);
      setTRAK(trak);
    }
  }, []);

  const handleNavigateTRAK = () => {
    navigation.navigate('TRAK');
  };

  const handleTRAKExchange = ({trak}: any) => {
    const modal = {
      type: 'wallet-exchange',
      exchange: {
        active: true,
        trak,
      },
    };
    const action = toggleExchangeView(modal);
    store.dispatch(action);
    // Alert.alert(
    //   'Pending TRX Exchange',
    //   `You are about to swap '${title}' by ${artist} for '${trak.title}' by ${trak.artist}`,
    //   [
    //     {
    //       text: 'Cancel',
    //       onPress: () => console.log('Cancel Pressed'),
    //       style: 'cancel',
    //     },
    //     {text: 'EXCHANGE', onPress: () => alert('bernie time')},
    //   ],
    // );
  };

  return {
    wallet,
    trak,
    handleNavigateTRAK,
    handleTRAKExchange,
  };
};
