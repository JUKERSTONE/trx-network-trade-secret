import React, {useEffect, useState, useContext} from 'react';
import {useAuthentication} from '../../authentication';
import {useTRAKLISTState} from '../../app';
import {Linking} from 'react-native';
import {toggleExchangeView, store} from '../../stores';
import {useFocusEffect} from '@react-navigation/native';

export const useWallet = ({navigation}: any) => {
  const {handleGetState} = useTRAKLISTState();
  const [wallet, setWallet] = useState([]);
  const [trak, setTRAK] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      const profile = handleGetState({index: 'profile'});
      const TRXProfile = profile.TRX;

      if (TRXProfile == null) {
        setTimeout(() => {
          const profile = handleGetState({index: 'profile'});
          const TRXProfile = profile.TRX;
          const product = TRXProfile?.wallet;

          const wallet = product?.map((item: any) => ({
            value: item.isNFT ? item.nft.trakTITLE : item.title,
            key: item.isNFT ? item.nftURI : item.trakURI,
          }));
          console.log(
            '🚀 ~ file: useWallet.ts ~ line 28 ~ wal ~ wallet',
            wallet,
          );
          setWallet(wallet);
          setTRAK(product);
        }, 4000);
      } else {
        const product = TRXProfile?.wallet;

        const wallet = product?.map((item: any) => ({
          value: item.isNFT ? item.nft.trakTITLE : item.title,
          key: item.isNFT ? `NFT:${item.nftID}` : `TRX:${item.trakID}`,
        }));
        setWallet(wallet);
        setTRAK(product);
      }
    }, []),
  );

  const handleNavigateTRAK = ({trak}: any) => {
    navigation.navigate('TRAK', {
      screen: 'TRAK',
      params: {trak},
    });
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

  const handleNavigateNFT = ({trak: nft}: any) => {
    navigation.navigate('TRAK', {
      screen: 'NFT',
      params: {nft},
    });
  };

  const handleConnectWallet = () => {
    navigation.navigate('CONNECT');
  };

  return {
    wallet,
    trak,
    handleNavigateTRAK,
    handleNavigateNFT,
    handleExchange,
    handleConnectWallet,
  };
};
