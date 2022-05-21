import React from 'react';
import {View, Text} from 'react-native';
import {useRemote} from './useRemote';
import {RemoteElement} from '../../elements';

export const RemoteContainer = ({
  navigation,
  route,
  chatURI,
  ...props
}: any) => {
  const {...useRemoteProps} = useRemote({navigation, route, chatURI});
  return <RemoteElement {...useRemoteProps} {...props} />;
};
