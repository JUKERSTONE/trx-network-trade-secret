import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {DonateStack, InstructionsStack, PaywallStack} from '../../stacks';

const Stack = createStackNavigator();

export const OnboardStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a1a',
        },
        headerTintColor: '#1db954',
      }}>
      <Stack.Screen
        name="DONATE"
        component={DonateStack}
        options={{
          header: () => null,
          title: 'DONATE',
        }}
      />
      <Stack.Screen
        name="INSTRUCTIONS"
        component={InstructionsStack}
        options={{
          title: 'INSTRUCTIONS',
        }}
      />
      <Stack.Screen
        name="PAYWALL"
        component={PaywallStack}
        options={{
          title: 'PAYWALL',
        }}
      />
    </Stack.Navigator>
  );
};
