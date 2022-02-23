import {View, Text} from 'react-native';
import React from 'react';
import {TRAKLISTNavigation} from './internal';
import {useTRAKLIST} from './useTRAKLISTApp';

export const TRAKLISTApp = () => {
  const {handleTheme} = useTRAKLIST();

  return <TRAKLISTNavigation handleTheme={handleTheme} /*user={user}*/ />;
};
