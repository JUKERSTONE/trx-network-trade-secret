import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Main} from '../../screens';

const Stack = createStackNavigator();

export const LibraryStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a1a',
        },
        headerTintColor: '#1db954',
      }}>
      <Stack.Screen
        name="LIBRARY"
        component={Main}
        options={{
          title: 'LIBRARY',
          header: () => null,
        }}
      />
    </Stack.Navigator>
  );
};
