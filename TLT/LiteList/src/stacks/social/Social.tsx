import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {HeaderContainer} from '../../containers';
import {SocialScreen} from '../../screens';

const Stack = createStackNavigator();

export const SocialStack = () => {
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
      {/* <Stack.Screen
        name="REGISTER"
        component={RegisterStack}
        options={{
          title: 'REGISTER',
        }}
      /> */}
      <Stack.Screen
        name="SOCIAL_DASHBOARD"
        component={SocialScreen}
        options={{
          title: 'SIGN IN',
          header: () => null,
        }}
      />
    </Stack.Navigator>
  );
};
