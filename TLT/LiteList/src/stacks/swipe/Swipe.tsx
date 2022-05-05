import React, {useContext} from 'react';
import {Image, SafeAreaView} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {SwipeScreen} from '../../screens';

export const SwipeStack: React.FC<any> = ({navigation}) => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a1a',
        },
        headerTintColor: '#cecece',
      }}>
      <Stack.Screen
        name="SWIPE."
        component={SwipeScreen}
        options={{
          title: '',
        }}
      />
    </Stack.Navigator>
  );
};
