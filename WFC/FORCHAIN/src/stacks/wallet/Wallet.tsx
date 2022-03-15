import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {WalletScreen} from '../../screens';
import {HeaderContainer} from '../../containers';
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
          return <HeaderContainer {...props} />;
        },
      }}>
      <Stack.Screen
        name="WALLET"
        component={WalletScreen}
        options={{
          title: 'WALLET',
        }}
      />
    </Stack.Navigator>
  );
};
