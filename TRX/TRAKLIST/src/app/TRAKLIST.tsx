import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';

export const TRAKLISTApp = () => {
  const isDarkMode = useColorScheme() === 'light';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? 'black' : 'white',
  };

  return (
    <SafeAreaView style={[{flex: 1}, backgroundStyle]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    </SafeAreaView>
  );
};
