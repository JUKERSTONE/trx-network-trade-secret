import React, {useEffect, useState, useContext} from 'react';
import {useAuthentication} from '../../authentication';
import {useTRAKLISTState} from '../../app';
import {Linking} from 'react-native';
import {toggleExchangeView, store} from '../../stores';
import {useFocusEffect} from '@react-navigation/native';

export const useWallet = ({navigation, route}: any) => {
  const {handleGetState} = useTRAKLISTState();
  const [nftWallet, setNFTWallet] = useState([]);
  const [nft, setNFT] = useState(null);
  const [trakWallet, setTRAKWallet] = useState([]);
  const [trak, setTRAK] = useState(null);

  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  const hasForchain =
    TRXProfile.hasOwnProperty('forchainId') ||
    (route?.params?.hasForchain ?? false);

  useFocusEffect(
    React.useCallback(() => {
      const walletState = handleGetState({index: 'wallet'});
      const nft = walletState?.nft;
      const trak = walletState?.trak;
      console.log(
        '🚀 ~ file: useWallet.ts ~ line 26 ~ React.useCallback ~ trak',
        trak,
      );

      const nftWallet = nft?.map((item: any) => ({
        value: item.isNFT ? item.nft.trakTITLE : item.title,
        key: item.isNFT ? `NFT:${item.nftID}` : `TRX:${item.trakID}`,
      }));
      setNFTWallet(nftWallet);
      setNFT(nft);

      const trakWallet = trak?.map((item: any) => ({
        value: item.isNFT ? item.nft.trakTITLE : item.title,
        key: item.isNFT ? `NFT:${item.nftID}` : `TRX:${item.trakID}`,
      }));
      setTRAKWallet(trakWallet);
      setTRAK(trak);
    }, []),
  );

  const handleNavigateTRAK = ({trak}: any) => {
    console.log(
      '🚀 ~ file: useWallet.ts ~ line 44 ~ handleNavigateTRAK ~ trak',
      trak,
    );
    navigation.navigate('TRAK', {
      screen: 'TRAK',
      params: {trak},
    });
  };

  const handleExchange = ({trak}: any) => {
    navigation.navigate('MODAL', {
      type: 'exchange',
      exchange: {
        active: true,
        mode: 'wallet',
        item: trak,
      },
    });
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
    nftWallet,
    trakWallet,
    nft,
    trak,
    handleNavigateTRAK,
    handleNavigateNFT,
    handleExchange,
    handleConnectWallet,
    hasForchain,
    profile: TRXProfile,
  };
};
