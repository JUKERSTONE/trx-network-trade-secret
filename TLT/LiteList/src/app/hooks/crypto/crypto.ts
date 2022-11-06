import {useState, useContext, useEffect} from 'react';
import {
  useAsyncStorage,
  asyncStorageIndex,
  setTransactions,
  store,
} from '../../../stores';
import axios from 'axios';
import {useLITELISTState, handleGetTransactions} from '../../../app';
import {useAPI} from '../../../api';
import {
  handleReproduceStacks,
  handleReproduceSolana,
  handleReproduceBitcoin,
  handleReproduceEthereum,
} from './handlers';

export const handleCrypto = async ({keys: serialized_tuc_keys, user}: any) => {
  const keys = JSON.parse(serialized_tuc_keys);
  console.log('🚀 ~ file: crypto.ts ~ line 16 ~ handleCrypto ~ test', test);
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

  // OPEN THAT SHIT UP

  const stx = handleReproduceStacks();
  const sol = handleReproduceSolana();
  const btc = handleReproduceBitcoin();
  const eth = handleReproduceEthereum();

  const wallet = {
    stx,
    btc,
    sol,
    eth,
  };
  console.log('🚀 ~ file: crypto.ts ~ line 46 ~ handleCrypto ~ tokens', wallet);

  const transactions = await handleGetTransactions(user);
  console.log(
    '🚀 ~ file: crypto.ts ~ line 50 ~ handleCrypto ~ transactions',
    transactions,
  );

  const action = setTransactions({transactions});
  store.dispatch(action);

  return wallet;
};
