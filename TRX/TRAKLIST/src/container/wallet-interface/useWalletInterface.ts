import React, {useEffect, useState, useContext} from 'react';
import {useAuthentication} from '../../authentication';
import {useTRAKLISTState} from '../../app';

export const useWalletInterface = ({navigation}: any) => {
  const {handleGetState} = useTRAKLISTState();
  const [wallet, setWallet] = useState([]);

  useEffect(() => {
    //
    // get traks from state
    const profile = handleGetState({index: 'profile'});
    const TRXProfile = profile.TRX;
    const trak = TRXProfile?.trak;
    console.log(
      '🚀 ~ file: useWalletInterface.ts ~ line 26 ~ useEffect ~ test',
      trak,
    );

    const wallet = trak.map((trak: any) => ({
      value: JSON.stringify(trak),
      key: trak.trakURI,
    }));

    setWallet(wallet);
    // send down traks
  }, []);

  return {
    wallet,
  };
};
