import React from 'react';
import {View, Text} from 'react-native';
import {ConnectElement} from '../../elements';
import {useConnect} from './useConnect';

export const ConnectContainer = ({...props}) => {
  const {...useConnectProps} = useConnect();
  return <ConnectElement {...useConnectProps} {...props} />;
};
