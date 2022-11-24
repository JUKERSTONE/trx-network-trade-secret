import React, {useEffect, useState, useContext} from 'react';
import {PlayerContext, useAsyncStorage} from '../../stores';

export const useAppBrowser = () => {
  const {userData, setUserData} = useContext(PlayerContext);
  const {handleStore} = useAsyncStorage();
  const browserRef = userData.browserRef;

  const handleLoadHTTPS = ({
    route = 'https://tsb.media/wallet',
    params = {},
  }) => {
    const injectedJavaScript: string = `window.location.replace('${route}');(function() {
      window.postMessage = function(data) {
        window.ReactNativeWebView.postMessage(data);
      };
    })()`;
    browserRef.current.injectJavaScript(injectedJavaScript);
  };

  const handleHTTPSResponse = async ({nativeEvent}: any) => {
    alert('cehck response');
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
        console.log(
          '🚀 ~ file: useAppBrowser.ts ~ line 34 ~ handleHTTPSResponse ~ fingerprint',
          fingerprint,
        );
        await handleStore({key: 'fingerprint', value: fingerprint});

        break;
      default:
        break;
    }
  };

  return {
    handleLoadHTTPS,
    handleHTTPSResponse,
  };
};
