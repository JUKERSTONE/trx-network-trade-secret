import {View, Text, Button} from 'react-native';
import React from 'react';
import {AuthenticationContainer} from '../containers';

export const AuthenticationScreen = ({...props}) => {
  return <AuthenticationContainer {...props} />;
};
