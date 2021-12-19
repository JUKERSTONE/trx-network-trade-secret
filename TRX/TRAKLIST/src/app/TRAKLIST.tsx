import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {TRAKLISTView, TRAKLISTNavigation} from './internal';
import {useTRAKLISTApp} from './internal';

export const TRAKLISTApp = () => {
  const {handleTheme} = useTRAKLISTApp();
  const isDarkMode = handleTheme().dark;
  return (
    <TRAKLISTView isDarkMode={isDarkMode}>
      <TRAKLISTNavigation handleTheme={handleTheme} />
    </TRAKLISTView>
  );
};
