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
        const product = TRXProfile?.wallet;

        const wallet = product?.map((item: any) => ({
          value: item.isNFT ? item.nft.trakTITLE : item.title,
          key: item.isNFT ? item.nftURI : item.trakURI,
        }));
        setWallet(wallet);
        setTRAK(product);
      }, 4000);
    } else {
      const product = TRXProfile?.wallet;

      const wallet = product?.map((item: any) => ({
        value: item.isNFT ? item.nft.trakTITLE : item.title,
        key: item.isNFT ? item.nftURI : item.trakURI,
      }));
      console.log(
        '🚀 ~ file: useWalletInterface.ts ~ line 40 ~ wal ~ wallet',
        wallet,
      );
      console.log(
        '🚀 ~ file: useWalletInterface.ts ~ line 11 ~ useWalletInterface ~ trak',
        product,
      );

      setWallet(wallet);
      setTRAK(product);
    }
  }, []);

  const handleNavigateTRAK = () => {
    navigation.navigate('TRAK');
  };

  const handleExchange = ({trak}: any) => {
    const modal = {
      type: 'exchange',
      exchange: {
        active: true,
        mode: 'wallet',
        item: trak,
      },
    };
    const action = toggleExchangeView(modal);
    store.dispatch(action);
  };

  return {
    wallet,
    trak,
    handleNavigateTRAK,
    handleExchange,
  };
};
