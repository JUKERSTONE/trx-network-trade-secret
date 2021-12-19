import React from 'react';
import {View, StatusBar, useColorScheme} from 'react-native';
import {colors} from '../../../../core';

export const TRAKLISTView = ({isDarkMode, children}: any) => {
  const backgroundStyle = {
    backgroundColor: isDarkMode ? colors.dark.primary : colors.light.primary,
  };

  return (
    <View style={[{flex: 1}, backgroundStyle]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {children}
    </View>
  );
};
