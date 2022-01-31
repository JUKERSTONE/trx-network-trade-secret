import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ExchangeInterface} from '../../interfaces';
import {TRAKStack} from '../TRAK';
import {HeaderContainer} from '../../container';
const Stack = createStackNavigator();

export const ExchangeStack = () => {
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
        name="EXCHANGE"
        component={ExchangeInterface}
        options={{
          title: 'EXCHANGE',
        }}
      />
    </Stack.Navigator>
  );
};
