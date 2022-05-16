import React from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  AuthenticationStack,
  SwipeStack,
  ListsStack,
  SocialStack,
} from '../stacks';
import {useLITELISTState} from '../app';

export const MainTabStack = ({user, ...props}: any) => {
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
      <Tab.Screen
        name="LISTS"
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color}) => (
            <MaterialIcons name="swipe" color={color} size={21} />
          ),
        }}
        component={SwipeStack}
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
                borderWidth: focused ? 3 : 2.5,
                borderColor: focused ? 'green' : '#333333',
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
        component={ListsStack}
      />
      {user ? (
        <Tab.Screen
          name="SOCIAL"
          options={{
            tabBarLabel: '',
            tabBarIcon: ({color}) => (
              <MaterialIcons name="location-history" color={color} size={26} />
            ),
          }}
          component={SocialStack}
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
  );
};
