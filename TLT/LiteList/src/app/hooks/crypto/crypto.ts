import {useState, useContext, useEffect} from 'react';
import {useAsyncStorage, asyncStorageIndex} from '../../../stores';

export const handleCrypto = async () => {
  const {handleGet} = useAsyncStorage();

  const stacksSerialized: any = await handleGet({
    key: asyncStorageIndex.stacks_keys,
  });

  const stacks = JSON.parse(stacksSerialized);
  const privateKey = stacks.private;
  const publicKey = stacks.public;
  const secretKey = stacks.secret;

  if (!secretKey) {
    return {
      success: false,
      data: 'no wallet connected',
    };
  }

  console.log('🚀 ~ file: crypto.ts ~ line 8 ~ handleCrypto ~ stacks', stacks);

  return {
    success: true,
    data: 'wallet connected',
  };
};
