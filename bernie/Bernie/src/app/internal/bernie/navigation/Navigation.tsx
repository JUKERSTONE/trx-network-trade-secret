import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {TokencyStack, NFTStack, AdminStack} from '../../../../stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Tab = createMaterialBottomTabNavigator();

export const BernieNavigation = ({...props}) => {
  return (
    <Tab.Navigator
      initialRouteName="Interface"
      activeColor="#FFF"
      inactiveColor="grey"
      {...props}>
      <Tab.Screen
        name="TRX"
        component={TokencyStack}
        options={{
          tabBarLabel: 'TRX',
          tabBarIcon: ({color}) => (
            <FontAwesome name="scissors" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="NFT"
        component={NFTStack}
        options={{
          tabBarLabel: 'NFTs',
          tabBarIcon: ({color}) => (
            <FontAwesome name="picture-o" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="ADMIN"
        component={AdminStack}
        options={{
          tabBarLabel: 'ADMIN',
          tabBarIcon: ({color}) => (
            <FontAwesome5 name="user-shield" color={color} size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
