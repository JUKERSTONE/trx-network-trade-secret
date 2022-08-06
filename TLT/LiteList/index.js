/**
 * @format
 */

import {AppRegistry} from 'react-native';
import React from 'react';
import {TRAKLITEInterfaceHOC, LiteListApp} from './src';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import 'react-native-gesture-handler';
import Purchases from 'react-native-purchases';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

function HeadlessCheck({isHeadless}) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  return <App />;
}

const App = TRAKLITEInterfaceHOC(LiteListApp);

AppRegistry.registerComponent(appName, () => HeadlessCheck);
