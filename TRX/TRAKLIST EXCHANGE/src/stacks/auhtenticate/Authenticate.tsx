import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Main,
  ConnectScreen,
  DetailsScreen,
  ProfileEditScreen,
} from '../../screens';

import {RegisterStack, SignInStack} from './internal';

const Stack = createStackNavigator();

export const AuthenticationStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a1a',
        },
        headerTintColor: '#1db954',
      }}>
      <Stack.Screen
        name="REGISTER"
        component={RegisterStack}
        options={{
          title: 'REGISTER',
          header: () => null,
        }}
      />
      <Stack.Screen
        name="SIGN_IN"
        component={SignInStack}
        options={{
          title: 'SIGN IN',
        }}
      />
    </Stack.Navigator>
  );
};
