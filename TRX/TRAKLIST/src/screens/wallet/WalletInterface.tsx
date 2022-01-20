import React from 'react';
import {View, Text, useWindowDimensions} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import {WalletView} from '../../elements';
import {WalletInterfaceContainer} from '../../container';

export const WalletInterfaceScreen = ({...props}) => {
  return <WalletInterfaceContainer {...props} />;
};
