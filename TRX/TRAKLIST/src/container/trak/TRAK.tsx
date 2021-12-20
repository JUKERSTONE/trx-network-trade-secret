import React from 'react';
import {View, Text} from 'react-native';
import {useTRAK} from './useTRAK';
import {TRAKElement} from '../../elements';

export const TRAKContainer = () => {
  const {...useTRAKProps} = useTRAK();
  return <TRAKElement {...useTRAKProps} />;
};
