import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HeaderContainer} from '../../containers';
import {ListsScreen} from '../../screens';

const Stack = createStackNavigator();

export const ListStack = ({...props}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a1a',
        },
        headerTintColor: '#1db954',
      }}>
      <Stack.Screen
        name="LIST"
        component={ListsScreen}
        options={{
          title: 'SEARCH',
          header: () => null,
        }}
      />
    </Stack.Navigator>
  );
};
