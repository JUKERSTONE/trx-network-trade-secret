import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {AuthenticationElement} from '../../elements';
import {useAuthentication} from './useAuthentication';

export const AuthenticationContainer = ({navigation, ...props}: any) => {
  const {...useHeaderProps} = useAuthentication({navigation});
  return <AuthenticationElement {...useHeaderProps} {...props} />;
};
