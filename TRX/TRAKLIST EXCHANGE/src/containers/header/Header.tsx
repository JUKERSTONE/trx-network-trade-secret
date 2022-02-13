import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {HeaderElement} from '../../elements';
import {useHeader} from './useHeader';

export const HeaderContainer = ({...props}) => {
  const {...useHeaderProps} = useHeader();
  return <HeaderElement {...useHeaderProps} {...props} />;
};
