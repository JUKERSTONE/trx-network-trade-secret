import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ExchangeScreen, RedeemScreen} from '../../screens';

const Stack = createStackNavigator();

export const RedeemStack = () => {
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
          title: 'Exchange',
          header: () => null,
        }}
      />
      <Stack.Screen
        name="REDEEM"
        component={RedeemScreen}
        options={{
          title: 'Exchange',
          header: () => null,
        }}
      />
    </Stack.Navigator>
  );
};
