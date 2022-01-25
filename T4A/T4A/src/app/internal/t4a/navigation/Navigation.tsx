import React from 'react';
import {View, Text, useColorScheme, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Main} from '../../../../screens';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import {useSelector} from 'react-redux';
import {SignInScreen, TRXDistributionScreen} from '../../../../screens';

import {DistributionStack} from '../../../../stacks';

const Tab = createMaterialBottomTabNavigator();

export const T4A = ({/*handleTheme,*/ user, ...props}: any) => {
  return (
    <NavigationContainer /*theme={handleTheme()}*/>
      <Tab.Navigator>
        <Tab.Screen
          name="TRX"
          options={{
            tabBarLabel: 'TRX',
            tabBarIcon: ({color}) => (
              <MaterialIcons name="gamepad" color={color} size={23} />
            ),
          }}
          component={DistributionStack}
        />
        <Tab.Screen
          name="T4A"
          options={{
            tabBarLabel: '',
            tabBarIcon: ({color, focused}) => (
              <Image
                style={{
                  height: 35,
                  width: 35,
                  marginTop: 8,
                  backgroundColor: focused ? '#fff' : 'whitesmoke',
                  borderRadius: 15,
                  borderWidth: 2.3,
                  borderColor: '#fff',
                  opacity: focused ? 1 : 0.85,
                }}
                source={{
                  uri: focused
                    ? 'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/Asset%207.png?alt=media'
                    : 'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/TRAKLIST.png?alt=media',
                }}
              />
            ),
            // tabBarIcon: ({color}) => (
            //   <FontAwesome5 name="exchange-alt" color={color} size={23} />
            // ),
          }}
          component={Main}
        />
        {user ? (
          <Tab.Screen
            name="NFTs"
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
            component={Main}
          />
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
