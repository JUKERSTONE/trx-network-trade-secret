import React, {useEffect, useState, useContext} from 'react';
import {
  PlayerContext,
  useAsyncStorage,
  handleUpdateBalances,
  store,
} from '../../stores';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
export const useAppBrowser = () => {
  const {userData, setUserData} = useContext(PlayerContext);
  const {handleStore} = useAsyncStorage();
  const browserRef = userData.browserRef;

  const profileTRX = useSelector((state: any) => state.profile.TRX);

  const handleLoadHTTPS = ({
    route = 'https://tsb.media/wallet',
    params = {},
  }) => {
    const injectedJavaScript: string = `window.params='${params}';window.location.replace('${route}');(function() {
      window.postMessage = function(data) {
        window.ReactNativeWebView.postMessage(data);
      };
    })()`;
    browserRef.current.injectJavaScript(injectedJavaScript);
  };

  const handleHTTPSResponse = async ({nativeEvent}: any) => {
    console.log(
      '🚀 ~ file: useAppBrowser.ts ~ line 18 ~ handleHTTPSResponse ~ nativeEvent',
      nativeEvent,
    );
    console.log(JSON.parse(nativeEvent.data));

    const cryptographicResponse = JSON.parse(nativeEvent.data);
    const mode = cryptographicResponse.mode;
    const data = cryptographicResponse.data;

    switch (mode) {
      case 'create-network-wallet':
        const fingerprint = data;
        await handleStore({key: 'fingerprint', value: fingerprint});
        Toast.show({
          type: 'info',
          text1: 'Crypto is working...',
          text2:
            "Storing your security keys in Apple Keychain - it's safe there dw :)",
        });
        break;
      case 'reproduce':
        const action = handleUpdateBalances(data);
        store.dispatch(action);
        Toast.show({
          type: 'info',
          text1: 'Crypto is working...',
          text2: 'Reproducing your wallets from the TSB M3DIA node!',
        });

      default:
        break;
    }
  };

  return {
    handleLoadHTTPS,
    handleHTTPSResponse,
    tuc_public_keys: profileTRX.tuc_public_keys,
  };
};
