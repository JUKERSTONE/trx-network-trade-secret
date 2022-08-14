import {useState, useContext, useEffect} from 'react';
import {useAsyncStorage, asyncStorageIndex} from '../../../stores';
import axios from 'axios';
import {useLITELISTState} from '../../../app';
import {useAPI} from '../../../api';

export const handleCrypto = async ({keys}: any) => {
  console.log('🚀 ~ file: crypto.ts ~ line 8 ~ handleCrypto ~ keys', keys);
  const {handleGetState} = useLITELISTState();

  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  console.log(
    '🚀 ~ file: crypto.ts ~ line 12 ~ handleCrypto ~ TRXProfile',
    TRXProfile,
  );
  // const stacks

  const {useGET, usePOST} = useAPI();
  const {handleGet} = useAsyncStorage();

  const route = `https://stacks-node-api.mainnet.stacks.co/extended/v1/address/${keys.public}/balances`;

  const account = await axios
    .get(route, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => {
      return res.data;
    });
  console.log(
    '🚀 ~ file: useFORCHAINApp.ts ~ line 76 ~ handleStacksWal ~ account',
    account,
  );

  const tokens = {
    stx: account.stx,
    btc: null,
    ada: null,
    sol: null,
    trx: null,
    eth: null,
    dai: null,
  };
  console.log('🚀 ~ file: crypto.ts ~ line 46 ~ handleCrypto ~ tokens', tokens);

  return tokens;
};
