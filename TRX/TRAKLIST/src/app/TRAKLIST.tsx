import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {TRAKLISTView, TRAKLISTNavigation} from './internal';
import {useTRAKLISTApp} from './';
import {store} from '../stores';
import {Provider} from 'react-redux';

export const TRAKLISTApp = () => {
  const {handleTheme} = useTRAKLISTApp();
  const isDarkMode = handleTheme().dark;

  return (
    <Provider store={store}>
      {/* AuthenticationState */}
      <TRAKLISTView isDarkMode={isDarkMode}>
        <TRAKLISTNavigation handleTheme={handleTheme} />
      </TRAKLISTView>
    </Provider>
  );
};
