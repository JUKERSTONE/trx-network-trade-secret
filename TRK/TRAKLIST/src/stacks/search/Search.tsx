import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HeaderContainer} from '../../containers';
import {Main} from '../../screens';

const Stack = createStackNavigator();

export const SearchStack = ({...props}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a1a',
        },
        headerTintColor: '#1db954',
      }}>
      <Stack.Screen
        name="SEARCH"
        component={Main}
        options={{
          title: 'SEARCH',
          header: () => <HeaderContainer {...props} />,
        }}
      />
    </Stack.Navigator>
  );
};
