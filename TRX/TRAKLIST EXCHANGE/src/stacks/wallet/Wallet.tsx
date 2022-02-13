import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {WalletInterface} from '../../interfaces';
import {TRAKStack} from '../TRAK';
import {NFTStack} from '../NFT';
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
          return (
            <HeaderContainer {...props} hasOptions hasMenu hasGoBack={false} />
          );
        },
      }}>
      <Stack.Screen
        name="WALLET"
        component={WalletInterface}
        options={{
          title: 'WALLET',
        }}
      />
      <Stack.Screen
        name="TRAK"
        component={TRAKStack}
        options={{
          title: 'TRAK',
        }}
      />
      <Stack.Screen
        name="NFT"
        component={NFTStack}
        options={{
          title: 'NFT',
        }}
      />
    </Stack.Navigator>
  );
};
