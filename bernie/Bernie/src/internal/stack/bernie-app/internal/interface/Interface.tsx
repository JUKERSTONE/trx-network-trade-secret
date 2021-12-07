import React from 'react';
import {View, Text} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {Currency} from '../../../../screens';

const Tab = createMaterialBottomTabNavigator();

export const InterfaceStack = ({...props}) => {
  return (
    <Tab.Navigator
      initialRouteName="Interface"
      activeColor="#FFF"
      inactiveColor="grey"
      {...props}>
      <Tab.Screen
        name="Currency"
        component={Currency}
        options={{
          tabBarLabel: 'CURRENCY',
          // tabBarIcon: ({color}) => (
          //   <MaterialIcons
          //     name="swipe"
          //     color={color}
          //     size={24}
          //     style={{paddingTop: 1}}
          //   />
          // ),
        }}
      />
    </Tab.Navigator>
  );
};
