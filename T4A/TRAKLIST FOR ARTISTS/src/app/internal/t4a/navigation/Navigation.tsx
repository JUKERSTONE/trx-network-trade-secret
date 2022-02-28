import React from 'react';
import {View, Text, useColorScheme, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Main, PortfolioScreen} from '../../../../screens';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import {useSelector} from 'react-redux';
import {SignInScreen, TRXDistributionScreen} from '../../../../screens';

import {DistributionStack, PortfolioStack} from '../../../../stacks';

const Tab = createMaterialBottomTabNavigator();

export const T4A = ({/*handleTheme,*/ user, ...props}: any) => {
  return (
    <NavigationContainer /*theme={handleTheme()}*/>
      <Tab.Navigator>
        {user ? (
          <>
            <Tab.Screen
              name="DISTRIBUTE"
              options={{
                tabBarLabel: 'DISTRO',
                tabBarIcon: ({color}) => (
                  <Entypo name="publish" color={color} size={23} />
                ),
              }}
              component={DistributionStack}
            />
            <Tab.Screen
              name="PORTFOLIO"
              options={{
                tabBarLabel: 'PORTFOLIO',
                tabBarIcon: ({color}) => (
                  <MaterialCommunityIcons
                    name="wallet-plus"
                    color={color}
                    size={23}
                  />
                ),
              }}
              component={PortfolioStack}
            />
          </>
        ) : (
          <Tab.Screen
            name="AUTHENTICATION"
            component={SignInScreen}
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
