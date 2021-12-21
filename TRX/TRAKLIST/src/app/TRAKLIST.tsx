import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {TRAKLISTView, TRAKLISTNavigation} from './internal';
import {useTRAKLISTApp} from './internal';
import {store} from '../stores';
import {Provider} from 'react-redux';

export const TRAKLISTApp = () => {
  const {handleTheme} = useTRAKLISTApp();
  const isDarkMode = handleTheme().dark;

  return (
    <Provider store={store}>
      <TRAKLISTView isDarkMode={isDarkMode}>
        <TRAKLISTNavigation handleTheme={handleTheme} />
      </TRAKLISTView>
    </Provider>
  );
};
