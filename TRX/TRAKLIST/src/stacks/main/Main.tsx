import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {LibraryStack} from '../library';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Tab = createMaterialBottomTabNavigator();

export const MainStack = ({...props}) => {
  return (
    <Tab.Navigator
      initialRouteName="Main"
      activeColor="#FFF"
      inactiveColor="grey"
      {...props}>
      <Tab.Screen
        name="LIBRARY"
        component={LibraryStack}
        options={{
          tabBarLabel: 'LIBRARY',
          tabBarIcon: ({color}) => (
            <FontAwesome5 name="record-vinyl" color={color} size={20} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="NFT"
        component={NFTStack}
        options={{
          tabBarLabel: 'NFTs',
          tabBarIcon: ({color}) => (
            <FontAwesome name="picture-o" color={color} size={20} />
          ),
        }}
      /> */}
      {/* <Tab.Screen
        name="ADMIN"
        component={AdminStack}
        options={{
          tabBarLabel: 'ADMIN',
          tabBarIcon: ({color}) => (
            <FontAwesome5 name="user-shield" color={color} size={20} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};
