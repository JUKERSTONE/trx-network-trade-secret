import React from 'react';
import {View, Text, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Main} from '../../../../screens';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import {AuthenticationStack} from '../../../../stacks';

const isAuthenticated = false;
const Tab = createMaterialBottomTabNavigator();
export const TRAKLISTNavigation = ({handleTheme, ...props}: any) => {
  return (
    <NavigationContainer theme={handleTheme()}>
      <Tab.Navigator>
        <Tab.Screen
          name="GAMES"
          options={{
            tabBarLabel: '',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="gesture-swipe"
                color={color}
                size={23}
              />
            ),
          }}
          component={Main}
        />
        <Tab.Screen
          name="EXCHANGE"
          options={{
            tabBarLabel: '',
            tabBarIcon: ({color}) => (
              <FontAwesome5 name="exchange-alt" color={color} size={23} />
            ),
          }}
          component={Main}
        />
        {isAuthenticated ? (
          <Tab.Screen
            name="LIBRARY"
            options={{
              tabBarLabel: '',
              tabBarIcon: ({color}) => (
                <FontAwesome5 name="record-vinyl" color={color} size={23} />
              ),
            }}
            component={Main}
          />
        ) : (
          <Tab.Screen
            name="AUTHENTICATION"
            component={AuthenticationStack}
            options={{
              tabBarLabel: '',
              tabBarIcon: ({color}) => (
                <Entypo name="login" color={color} size={23} />
              ),
            }}
          />
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
};
