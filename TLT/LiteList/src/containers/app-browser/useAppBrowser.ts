import React, {useEffect, useState, useContext} from 'react';
import {PlayerContext} from '../../stores';

export const useAppBrowser = () => {
  const [HTTPSResponse, setHTTPSResponse] = useState();
  const {userData, setUserData} = useContext(PlayerContext);
  const browserRef = userData.browserRef;

  const handleLoadHTTPS = ({
    route = 'https://crypto.tsb.media',
    params = {},
  }) => {
    const injectedJavaScript: string = `window.location.replace('${route}');`;
    browserRef.current.injectJavaScript(injectedJavaScript);
  };

  const handleHTTPSResponse = ({nativeEvent}: any) => {
    console.log(nativeEvent.data);

    const httpsResponse = nativeEvent.data;
    setHTTPSResponse(httpsResponse);
  };

  return {
    handleLoadHTTPS,
    handleHTTPSResponse,
    HTTPSResponse,
  };
};
