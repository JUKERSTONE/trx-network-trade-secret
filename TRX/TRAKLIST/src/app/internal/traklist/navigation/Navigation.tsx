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
import {AuthenticationStack, WalletStack} from '../../../../stacks';
import {useSelector} from 'react-redux';

const Tab = createMaterialBottomTabNavigator();

export const TRAKLISTNavigation = ({handleTheme, ...props}: any) => {
  const state = useSelector((state: any) => state.authenticate);
  const isAuthenticated = state.isAuthenticated;
  return (
    <NavigationContainer theme={handleTheme()}>
      <Tab.Navigator>
        <Tab.Screen
          name="GAMES"
          options={{
            tabBarLabel: 'CASINO',
            tabBarIcon: ({color}) => (
              <MaterialIcons name="casino" color={color} size={23} />
            ),
          }}
          component={Main}
        />
        <Tab.Screen
          name="EXCHANGE"
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
        {isAuthenticated ? (
          <Tab.Screen
            name="WALLET"
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
