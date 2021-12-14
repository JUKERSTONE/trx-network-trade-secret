import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {LibraryStack} from '../library';
import {AuthenticationStack} from '../authentication';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

export const MainStack = ({...props}) => {
  return (
    <Tab.Navigator
      initialRouteName="Main"
      activeColor="#FFF"
      inactiveColor="grey"
      {...props}>
      <Tab.Screen
        name="GAMES"
        component={LibraryStack}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="gesture-swipe"
              color={color}
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name="DISCOVER"
        component={LibraryStack}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color}) => (
            <FontAwesome5 name="search-dollar" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="EXCHANGE"
        component={LibraryStack}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color}) => (
            <FontAwesome5 name="exchange-alt" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="LIBRARY"
        component={LibraryStack}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color}) => (
            <FontAwesome5 name="record-vinyl" color={color} size={25} />
          ),
        }}
      />
      {
        // isLoggedIn &&
        <Tab.Screen
          name="AUTHENTICATION"
          component={AuthenticationStack}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({color}) => (
              <Entypo name="login" color={color} size={25} />
            ),
          }}
        />
      }
    </Tab.Navigator>
  );
};
