import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {RedeemStack, MintStack} from './internal';
import {TRXDistributionScreen} from '../../screens';

const Stack = createStackNavigator();

export const DistributionStack = () => {
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
        component={TRXDistributionScreen}
        options={{
          title: 'TRX DISTRIBUTION',
          header: () => null,
        }}
      />
      <Stack.Screen
        name="REDEEM"
        component={RedeemStack}
        options={{
          title: 'REDEEM',
          header: () => null,
        }}
      />
      <Stack.Screen
        name="MINT"
        component={MintStack}
        options={{
          title: 'MINT',
        }}
      />
    </Stack.Navigator>
  );
};
