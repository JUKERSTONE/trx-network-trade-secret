import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {TRAKLISTView, TRAKLISTNavigation} from './internal';

export const TRAKLISTApp = () => {
  return (
    <TRAKLISTView>
      <TRAKLISTNavigation />
    </TRAKLISTView>
  );
};
