import React, {useEffect, useState, useContext} from 'react';
import {useAuthentication} from '../../authentication';
import {useTRAKLISTState} from '../../app';

export const useWalletInterface = ({navigation}: any) => {
  const {handleGetState} = useTRAKLISTState();
  const [wallet, setWallet] = useState([]);
  const [trak, setTRAK] = useState({});

  useEffect(() => {
    const profile = handleGetState({index: 'profile'});
    console.log(
      '🚀 ~ file: useWalletInterface.ts ~ line 12 ~ useEffect ~ profile',
      profile,
    );
    const TRXProfile = profile.TRX;
    console.log(
      '🚀 ~ file: useWalletInterface.ts ~ line 13 ~ useEffect ~ TRXProfile',
      TRXProfile,
    );
    const trak = TRXProfile?.trak;
    console.log(
      '🚀 ~ file: useWalletInterface.ts ~ line 26 ~ useEffect ~ test',
      trak,
    );

    const wallet = trak?.map((trak: any) => ({
      value: trak.title,
      key: trak.trakURI,
    }));

    setWallet(wallet);
    setTRAK(trak);
  }, []);

  const handleNavigateTRAK = () => {
    navigation.navigate('TRAK');
  };

  return {
    wallet,
    trak,
    handleNavigateTRAK,
  };
};
