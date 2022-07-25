import React from 'react';
import {Image, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {createStackNavigator} from '@react-navigation/stack';
import {MainTabStack} from '../../../MainTab';
import {
  TRXModalContainer,
  HeaderContainer,
  WalletConnectContainer,
  MMSChatContainer,
} from '../../../../containers';

const Tab = createMaterialBottomTabNavigator();

export const TRAKLIST = React.memo(({handleTheme, user}: any) => {
  console.log(
    '🚀 ~ file: Navigation.tsx ~ line 15 ~ TRAKLIST ~ handleTheme',
    handleTheme,
  );
  const Stack = createStackNavigator();
  return (
    <NavigationContainer theme={handleTheme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1a1a1a',
          },
          headerTintColor: '#1db954',
        }}>
        <Stack.Screen
          name="MAIN"
          component={() => MainTabStack({user})} //add user to state
          options={{
            title: 'MAIN',
            header: () => null,
          }}
        />
        <Stack.Group screenOptions={{presentation: 'modal'}}>
          <Stack.Screen
            name="MODAL"
            component={TRXModalContainer}
            options={{
              title: 'MAIN',
              header: props => (
                <View style={{marginTop: 10}}>
                  <HeaderContainer hasBackButton isModal {...props} />
                </View>
              ),
            }}
          />
          <Stack.Screen
            name="WalletConnect"
            component={WalletConnectContainer}
            options={{
              title: 'MAIN',
              header: props => (
                <View style={{marginTop: 10}}>
                  <HeaderContainer hasBackButton isModal {...props} />
                </View>
              ),
            }}
          />
          <Stack.Screen
            name="MMS"
            component={MMSChatContainer}
            options={{
              title: 'MAIN',
              header: props => (
                <View style={{marginTop: 10}}>
                  <HeaderContainer hasBackButton isModal {...props} />
                </View>
              ),
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
});
