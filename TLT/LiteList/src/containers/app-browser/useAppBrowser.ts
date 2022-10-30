import React, {useEffect, useState, useContext} from 'react';
import {PlayerContext} from '../../stores';

export const useAppBrowser = ({navigation, route}: any) => {
  const [HTTPSResponse, setHTTPSResponse] = useState();
  const {userData, setUserData} = useContext(PlayerContext);
  const browserRef = userData.browserRef;

  const handleLoadHTTPS = ({
    route = 'https://crypto.tsb.media',
    params = {},
  }) => {
    const injectJavaScript = ''; /**pathname, params */
    browserRef.current.injectJavaScript(injectJavaScript);
    browserRef.current.reload();
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
