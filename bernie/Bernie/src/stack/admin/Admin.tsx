import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  TokencyScreen,
  SetTokenScreen,
  TLTNewsScreen,
  MineTokenScreen,
  AdminDashboardScreen,
  TLTTrendingScreen,
  OriginalsRankerScreen,
  TRX00MatchScreen,
  MerchandiseShopScreen,
  RecordsShopScreen,
} from '../../screens';
import {GeniusMatchContainer} from '../../containers';

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
      <Stack.Screen
        name="OG_RANKER"
        component={OriginalsRankerScreen}
        options={{
          title: 'TLT OG_RANKER',
        }}
      />
      <Stack.Screen
        name="TRX00MATCH"
        component={TRX00MatchScreen}
        options={{
          title: 'TRX00MATCH',
        }}
      />
      <Stack.Screen
        name="MerchandiseShop"
        component={MerchandiseShopScreen}
        options={{
          title: 'MerchandiseShop',
        }}
      />
      <Stack.Screen
        name="RecordsShop"
        component={RecordsShopScreen}
        options={{
          title: 'RecordsShop',
        }}
      />
      <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen
          name="GeniusMatch"
          component={GeniusMatchContainer}
          options={{
            title: 'MATCH',
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
