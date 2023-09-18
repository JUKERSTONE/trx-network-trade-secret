import React, {useRef, useContext, useEffect, useState} from 'react';
import {WebView} from 'react-native-webview';
import {StyleSheet, View} from 'react-native';
import {PlayerContext} from '../../stores';

export const TRXPictureInPictureElement = ({
  picture1,
  picture2,
  handleMessage,
  currentTime,
  PiP1Ref,
  PiP2Ref,
  isPrimaryPlaying,
  isPrimaryWebViewLoaded,
  isSecondaryWebViewLoaded,
  fetchVideoTimeJS,
  ...props
}: any) => {
  return (
    <>
      <WebView
        ref={PiP1Ref}
        style={styles.container}
        allowsInlineMediaPlayback={true}
        source={{
          uri: isPrimaryWebViewLoaded ? picture1 : null,
        }}
        onMessage={handleMessage}
        injectedJavaScript={fetchVideoTimeJS(isPrimaryPlaying)}
      />
      <WebView
        ref={PiP2Ref}
        style={styles.container}
        allowsInlineMediaPlayback={true}
        source={{
          uri: isSecondaryWebViewLoaded ? picture2 : null,
        }}
        onMessage={handleMessage}
        injectedJavaScript={fetchVideoTimeJS(!isPrimaryPlaying)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 100,
    margin: 10,
  },
});
