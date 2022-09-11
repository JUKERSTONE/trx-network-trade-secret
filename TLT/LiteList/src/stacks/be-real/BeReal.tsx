import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {HeaderContainer} from '../../containers';
import {ListsInterface} from '../../interfaces';
import {LastPlayedScreen} from '../../screens';

const Stack = createStackNavigator();
export const BeRealStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a1a',
        },
        headerTintColor: '#1db954',
      }}>
      <Stack.Screen
        name="LAST_PLAYED"
        component={LastPlayedScreen}
        options={{
          header: props => (
            <HeaderContainer
              backgroundColor="#1a1a1a"
              // hasBackButton
              hasShazam
              {...props}
              hasTRAKLIST
            />
          ),
          title: 'LISTS',
        }}
      />
    </Stack.Navigator>
  );
};
