import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ExchangeScreen} from '../../screens';
import {TRAKStack} from '../TRAK';

const Stack = createStackNavigator();

export const ExchangeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a1a',
        },
        headerTintColor: '#1db954',
      }}>
      <Stack.Screen
        name="EXCHANGE"
        component={ExchangeScreen}
        options={{
          title: 'EXCHANGE',
        }}
      />
    </Stack.Navigator>
  );
};
