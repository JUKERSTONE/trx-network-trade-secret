import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Main} from '../../../screens';

const Stack = createStackNavigator();

export const MintStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a1a',
        },
        headerTintColor: '#1db954',
      }}>
      <Stack.Screen
        name="MINT"
        component={Main}
        options={{
          title: 'REGISTER',
          header: () => null,
        }}
      />
    </Stack.Navigator>
  );
};
