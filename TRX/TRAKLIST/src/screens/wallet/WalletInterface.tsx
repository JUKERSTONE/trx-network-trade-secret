import React from 'react';
import {View, Text, useWindowDimensions} from 'react-native';
import {WalletView} from '../../elements';
import {WalletInterfaceContainer} from '../../container';

export const WalletInterfaceScreen = ({...props}) => {
  return <WalletInterfaceContainer {...props} />;
};
