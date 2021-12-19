import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {colors} from '../../../../core';

export const TRAKLISTView = ({children}: any) => {
  const isDarkMode = useColorScheme() === 'light';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? colors.light.primary : colors.dark.primary,
  };
  return (
    <SafeAreaView style={[{flex: 1}, backgroundStyle]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {children}
    </SafeAreaView>
  );
};
