import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Main} from '../../../screens';

const Tab = createMaterialBottomTabNavigator();

export const TRAKLISTNavigation = () => {
  return (
    <NavigationContainer /*theme={handleTheme()}*/>
      <Tab.Navigator>
        {/* <Tab.Screen
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
          name="TRX"
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
          }}
          component={ExchangeStack}
        />
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
          )} */}
        <Tab.Screen
          name="AUTHENTICATION"
          component={Main}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({color}) => (
              <Entypo name="login" color={color} size={23} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
