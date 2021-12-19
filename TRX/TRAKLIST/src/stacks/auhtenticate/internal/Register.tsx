import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ConnectScreen, DetailsScreen, ProfileScreen} from '../../../screens';

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
          title: 'Connect',
        }}
      />
      <Stack.Screen
        name="SIGN_IN"
        component={DetailsScreen}
        options={{
          title: 'SIGN_IN',
        }}
      />
      <Stack.Screen
        name="SIGN_IN"
        component={ProfileScreen}
        options={{
          title: 'SIGN_IN',
        }}
      />
    </Stack.Navigator>
  );
};
