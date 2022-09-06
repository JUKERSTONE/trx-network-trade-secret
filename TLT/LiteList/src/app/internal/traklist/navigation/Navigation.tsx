import React from 'react';
import {View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import {
  TRXModalContainer,
  HeaderContainer,
  WalletConnectContainer,
  MMSChatContainer,
  SendCryptoContainer,
  GeniusContainer,
  WebContainer,
} from '../../../../containers';
import {MainTabStack} from '../../../MainTab';

const Tab = createMaterialBottomTabNavigator();

export const INTEFACE_ = React.memo(({handleTheme, user}: any) => {
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
                  <HeaderContainer
                    hasTRAKLIST
                    hasBackButton
                    isModal
                    {...props}
                  />
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
          <Stack.Screen
            name="CRYPTO"
            component={SendCryptoContainer}
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
            name="GENIUS"
            component={GeniusContainer}
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
            name="WEBVIEW"
            component={WebContainer}
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
