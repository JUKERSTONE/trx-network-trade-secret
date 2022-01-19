import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  ConnectScreen,
  ProfileScreen,
  Main,
  DetailsScreen,
  ProfileEditScreen,
} from '../../../../screens';

import {OnboardStack} from '../../../onboard';

const Stack = createStackNavigator();

export const RegisterStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a1a',
        },
        headerTintColor: '#1db954',
      }}>
      <Stack.Screen
        name="CONNECT"
        component={ConnectScreen}
        options={{
          title: 'REGISTER',
        }}
      />
      <Stack.Screen
        name="DETAILS"
        component={DetailsScreen}
        options={{
          title: 'DETAILS',
        }}
      />
      <Stack.Screen
        name="PROFILE_EDIT"
        component={ProfileEditScreen}
        options={{
          title: 'PROFILE',
        }}
      />
      <Stack.Screen
        name="ONBOARD"
        component={OnboardStack}
        options={{
          title: 'ONBOARD',
        }}
      />
    </Stack.Navigator>
  );
};
