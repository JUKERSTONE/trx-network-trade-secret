import React, {useEffect, useState} from 'react';
import {Image, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  AuthenticationStack,
  SwipeStack,
  ListsStack,
  SocialStack,
  ChatStack,
} from '../stacks';
import {useLITELISTState} from '../app';
import {IStore, store, storeSearch} from '../stores';

export const MainTabStack = ({user, ...props}: any) => {
  const [chats, setChats] = useState({});

  const {handleGetState} = useLITELISTState();
  const authentication = handleGetState({index: 'authentication'});
  const isLoggedIn = authentication.isLoggedIn;
  console.log(
    '🚀 ~ file: MainTab.tsx ~ line 21 ~ MainTabStack ~ FirebaseProfile',
    isLoggedIn,
  );

  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator>
      {user && (
        <Tab.Screen
          name="LISTS"
          options={{
            tabBarLabel: '',
            tabBarIcon: ({color, focused}) => (
              <MaterialIcons
                name="swipe"
                color={focused ? '#1db954' : 'grey'}
                size={24}
              />
            ),
          }}
          component={SwipeStack}
        />
      )}
      <Tab.Screen
        name="TRX"
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, focused}) => (
            <MaterialIcons name="shop" color={color} size={24} />
          ),
        }}
        component={ListsStack}
      />

      {user ? (
        <>
          <Tab.Screen
            name="SOCIAL"
            options={{
              tabBarLabel: '',
              tabBarIcon: ({color, focused}) => (
                <MaterialIcons
                  name="library-music"
                  color={focused ? '#1db954' : 'grey'}
                  size={22}
                />
              ),
            }}
            component={SocialStack}
          />
          <Tab.Screen
            name="CHAT"
            options={{
              tabBarLabel: '',
              tabBarIcon: ({color, focused}) => (
                <Ionicons
                  name="chatbox-ellipses"
                  color={focused ? '#1db954' : 'grey'}
                  size={22}
                />
              ),
            }}
            component={ChatStack}
          />
        </>
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
      {/* {!user && (
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
    </Tab.Navigator>
  );
};
