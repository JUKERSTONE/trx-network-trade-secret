import React, {useEffect, useState, useContext} from 'react';
import {useAppBrowser} from '../app-browser';

export const useWalletSetup = ({navigation, route}: any) => {
  const [secretKey, setSecretKey] = useState<any>(null);
  const [keys, setKeys] = useState(null);

  const {handleLoadHTTPS} = useAppBrowser();

  useEffect(() => {
    const route = 'https://tsb.media/wallet';
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
          likes: [],
        },
      },
    });
  };

  const handleNewSecretKey = async () => {
    const {
      params: {profile},
    } = route;

    navigation.navigate('PAYWALL', {
      screen: 'SUBSCRIPTIONS',
      params: {
        profile: {
          ...profile,
          likes: [],
        },
      },
    });
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
