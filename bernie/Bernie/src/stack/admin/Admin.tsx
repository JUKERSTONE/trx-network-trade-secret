import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  TokencyScreen,
  SetTokenScreen,
  TLTNewsScreen,
  MineTokenScreen,
  AdminDashboardScreen,
  TLTTrendingScreen,
} from '../../screens';

const Stack = createStackNavigator();

export const AdminStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a1a',
        },
        headerTintColor: '#1db954',
      }}>
      <Stack.Screen
        name="ADMIN_DASHBOARD"
        component={AdminDashboardScreen}
        options={{
          title: 'ADMIN DASHBOARD',
        }}
      />
      <Stack.Screen
        name="TLT_TRENDING"
        component={TLTTrendingScreen}
        options={{
          title: 'TLT Trending',
        }}
      />
      <Stack.Screen
        name="TLT_NEWS"
        component={TLTNewsScreen}
        options={{
          title: 'TLT News',
        }}
      />
    </Stack.Navigator>
  );
};
