import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {WalletInterfaceScreen, DCMScreen} from '../../screens';

const Stack = createStackNavigator();

export const WalletStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a1a',
        },
        headerTintColor: '#1db954',
      }}>
      <Stack.Screen
        name="WALLET"
        component={WalletInterfaceScreen}
        options={{
          title: 'WALLET',
        }}
      />
      <Stack.Screen
        name="DCM"
        component={DCMScreen}
        options={{
          title: 'DCMs',
        }}
      />
    </Stack.Navigator>
  );
};
