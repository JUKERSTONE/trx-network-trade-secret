import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {RedeemStack, MintStack} from './internal';
import {PortfolioScreen} from '../screens';

const Stack = createStackNavigator();

export const PortfolioStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a1a',
        },
        headerTintColor: '#1db954',
      }}>
      <Stack.Screen
        name="TRX_DISTRIBUTION"
        component={PortfolioScreen}
        options={{
          title: 'TRX DISTRIBUTION',
          header: () => null,
        }}
      />
    </Stack.Navigator>
  );
};
