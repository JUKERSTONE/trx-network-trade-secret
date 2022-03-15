import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {RegisterStack} from './internal';
import {SignInScreen, AuthenticationScreen} from '../../screens';

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
        name="AUTHENTICATION"
        component={AuthenticationScreen}
        options={{
          title: 'AUTHENTICATION',
          header: () => null,
        }}
      />
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
        component={SignInScreen}
        options={{
          title: 'SIGN IN',
          header: () => null,
        }}
      />
    </Stack.Navigator>
  );
};
