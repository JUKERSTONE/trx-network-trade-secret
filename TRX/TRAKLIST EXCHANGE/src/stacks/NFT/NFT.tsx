import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NFTInterface} from '../../interfaces';

const Stack = createStackNavigator();

export const NFTStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a1a',
        },
        headerTintColor: '#1db954',
      }}>
      <Stack.Screen
        name="NFT"
        component={NFTInterface}
        options={{
          header: () => null,
          title: 'NFT',
        }}
      />
    </Stack.Navigator>
  );
};
