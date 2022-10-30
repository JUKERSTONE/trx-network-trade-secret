import React, {useRef, useContext} from 'react';
import {WebView} from 'react-native-webview';
import {View} from 'react-native';
import {PlayerContext} from '../../stores';

export const AppBrowserElement = ({handleHTTPSResponse, ...props}: any) => {
  const {userData, setUserData} = useContext(PlayerContext);
  const browserRef = userData.browserRef;
  return (
    <View>
      <WebView ref={browserRef} onMessage={handleHTTPSResponse} />
    </View>
  );
};
