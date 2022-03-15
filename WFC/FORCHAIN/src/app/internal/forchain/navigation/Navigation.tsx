import React from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
// import {Main} from '../../../../screens';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {WalletStack, AuthenticationStack} from '../../../../stacks';

const Tab = createMaterialBottomTabNavigator();

export const FORCHAIN = ({handleTheme, user = false}: any) => {
  return (
    <NavigationContainer /*theme={handleTheme()}*/>
      <Tab.Navigator>
        {user ? (
          <Tab.Screen
            name="WALLET+"
            options={{
              tabBarLabel: 'WALLET+',
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons
                  name="wallet-plus"
                  color={color}
                  size={23}
                />
              ),
            }}
            component={WalletStack}
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
