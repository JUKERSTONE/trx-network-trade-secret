import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Main,
  ConnectScreen,
  DetailsScreen,
  ProfileEditScreen,
} from '../../screens';

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
    </Stack.Navigator>
  );
};
