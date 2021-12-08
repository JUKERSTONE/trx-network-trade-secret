import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  TokencyScreen,
  SetTokenScreen,
  AppendTokenScreen,
  MineTokenScreen,
} from '../../screens';

const Stack = createStackNavigator();

export const NFTStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a1a',
        },
        headerTintColor: '#1db954',
      }}>
      <Stack.Screen
        name="TOKENCY"
        component={TokencyScreen}
        options={{
          title: 'Set Token',
        }}
      />
      <Stack.Screen
        name="SET_TOKEN"
        component={SetTokenScreen}
        options={{
          title: 'Set Token',
        }}
      />
      <Stack.Screen
        name="APPEND_TOKEN"
        component={AppendTokenScreen}
        options={{
          title: 'Append Token',
        }}
      />
      <Stack.Screen
        name="MINE_TOKEN"
        component={MineTokenScreen}
        options={{
          title: 'Mine Token',
        }}
      />
    </Stack.Navigator>
  );
};
