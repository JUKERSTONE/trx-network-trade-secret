import React from 'react';
import {View, Text} from 'react-native';
import {useRegister} from './useRegister';
import {RegisterElement} from '../../elements';

export const RegisterContainer = ({...props}) => {
  const {...useRegisterProps} = useRegister();
  return <RegisterElement {...useRegisterProps} {...props} />;
};
