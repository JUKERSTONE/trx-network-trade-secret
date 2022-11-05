import React, {useEffect, useState, useContext} from 'react';
import {useAppBrowser} from '../app-browser';

export const useWalletSetup = ({navigation, route}: any) => {
  const [secretKey, setSecretKey] = useState<any>(null);
  const [keys, setKeys] = useState(null);

  const {handleLoadHTTPS} = useAppBrowser();

  useEffect(() => {
    const route = 'https://crypto.com';
    const params = '/wallet';
    handleLoadHTTPS({route, params});
  }, []);

  const handleClearKey = () => {
    setSecretKey(null);
  };

  const handleClaim = () => {
    const {
      params: {profile},
    } = route;
    console.log(
      '🚀 ~ file: useWalletSetup.ts ~ line 16 ~ handleClaim ~ profile',
      route,
    );

    navigation.navigate('PAYWALL', {
      screen: 'SUBSCRIPTIONS',
      params: {
        profile: {
          ...profile,
          stacks_keys: keys,
          likes: [],
        },
      },
    });
  };

  const handleNewSecretKey = () => {
    const route = 'http://localhost:3000/wallet';
    const params = '/wallet';
    handleLoadHTTPS({route, params});

    // setSecretKey(keyData.secret);
    // setKeys(keyData);
  };

  const handleCopyKey = () => {
    //  keychain
    // Clipboard.setString(secretKey);
  };

  return {
    handleNewSecretKey,
    handleClaim,
    handleClearKey,
    handleCopyKey,
    secretKey,
  };
};
