import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Main,
  CreatePasswordScreen,
  PrivateKeyScreen,
  VerifyWalletScreen,
} from '../../../../screens';

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
        name="CREATE_PASSWORD"
        component={CreatePasswordScreen}
        options={{
          title: 'CREATE PASSWORD',
        }}
      />
      <Stack.Screen
        name="PRIVATE_KEY_VIEW"
        component={PrivateKeyScreen}
        options={{
          title: 'PRIVATE KEY SCREEN',
        }}
      />
      <Stack.Screen
        name="VERIFY_WALLET"
        component={VerifyWalletScreen}
        options={{
          title: 'PROFILE',
        }}
      />
    </Stack.Navigator>
  );
};
