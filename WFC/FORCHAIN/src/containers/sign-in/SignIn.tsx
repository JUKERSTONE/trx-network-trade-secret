import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {AuthenticationElement} from '../../elements';
import {useSignIn} from './useSignIn';

export const SignInContainer = ({navigation, ...props}: any) => {
  const {...useHeaderProps} = useSignIn({navigation});
  return <AuthenticationElement {...useHeaderProps} {...props} />;
};
