import React, {useContext} from 'react';
import {Image, SafeAreaView} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {HeaderContainer} from '../../containers';
import {SwipeInterface} from '../../interfaces';
import {AuthenticationStack, ListsStack, SocialStack} from '../../stacks';

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
        component={SwipeInterface}
        options={{
          title: '',
          header: props => (
            <HeaderContainer backgroundColor="#232323" hasSearch {...props} />
          ),
        }}
      />
      <Stack.Screen
        name="SOCIAL"
        component={SocialStack}
        options={{
          title: '',
          header: props => null,
        }}
      />
      <Stack.Screen
        name="SEARCH"
        component={ListsStack}
        options={{
          title: '',
          header: props => null,
        }}
      />
    </Stack.Navigator>
  );
};
