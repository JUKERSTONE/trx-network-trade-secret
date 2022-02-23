import {View, Text, Image} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Main} from '../../../screens';
import {LibraryStack, SearchStack, AuthenticationStack} from '../../../stacks';

const Tab = createMaterialBottomTabNavigator();

export const TRAKLISTNavigation = ({handleTheme, user}: any) => {
  return (
    <NavigationContainer theme={handleTheme()}>
      <Tab.Navigator>
        <Tab.Screen
          name="LISTS"
          options={{
            tabBarLabel: 'LISTS',
            tabBarIcon: ({color}) => (
              <FontAwesome5 name="record-vinyl" color={color} size={23} />
            ),
          }}
          component={Main}
        />
        <Tab.Screen
          name="SEARCH"
          options={{
            tabBarLabel: 'SEARCH',
            tabBarIcon: ({color}) => (
              <MaterialIcons name="search" color={color} size={23} />
            ),
          }}
          component={SearchStack}
        />
        {user ? (
          <Tab.Screen
            name="LIBRARY"
            options={{
              tabBarLabel: 'LIBRARY',
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons
                  name="library"
                  color={color}
                  size={23}
                />
              ),
            }}
            component={LibraryStack}
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
