import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {WalletInterfaceScreen, DCMScreen} from '../../screens';
import {TRAKStack} from '../TRAK';
import {HeaderContainer} from '../../container';
const Stack = createStackNavigator();

export const WalletStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a1a',
        },
        headerTintColor: '#1db954',
        header: props => {
          return (
            <HeaderContainer {...props} hasOptions hasMenu hasGoBack={false} />
          );
        },
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
      <Stack.Screen
        name="TRAK"
        component={TRAKStack}
        options={{
          title: 'TRAK',
        }}
      />
    </Stack.Navigator>
  );
};
