import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {HeaderContainer} from '../../containers';
import {SocialScreen, MessagingScreen, ChatScreen} from '../../screens';

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
      <Stack.Screen
        name="MESSAGING"
        component={MessagingScreen}
        options={{
          title: 'MESSAGING',
        }}
      />
      <Stack.Screen
        name="CHAT"
        component={ChatScreen}
        options={{
          title: 'CHAT',
          header: props => <HeaderContainer hasBackButton isModal {...props} />,
        }}
      />
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
