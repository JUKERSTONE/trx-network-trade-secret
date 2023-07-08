import React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import {
  HeaderContainer,
  RSSBillboardContainer,
  RSSComplexContainer,
  RSSPitchforkContainer,
  RSSHotNewHipHopContainer,
  RSSOfficialChartsContainer,
  RSSHypebeastContainer,
  ProductContainer,
  ExplorerContainer,
  BasketContainer,
  ForYouContainer,
  OriginalsContainer,
} from '../../containers';
import {CheckoutInterface} from '../../interfaces';
import {StorefrontScreen} from '../../screens';

const Stack = createStackNavigator();

export const ListsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a1a',
        },
        headerTintColor: '#1db954',
      }}>
      <Stack.Screen
        name="LIST_DASHBOARD"
        component={StorefrontScreen}
        options={{
          header: props => (
            <HeaderContainer
              backgroundColor="#1a1a1a"
              hasBasket
              {...props}
              hasTRAKLIST
            />
          ),
          title: 'LISTS',
        }}
      />
      <Stack.Screen
        name="Explorer"
        component={ExplorerContainer}
        options={{
          header: props => (
            <HeaderContainer
              backgroundColor="#1a1a1a"
              hasBasket
              {...props}
              hasTRAKLIST
            />
          ),
          title: 'LISTS',
        }}
      />
      <Stack.Screen
        name="bilboard"
        component={RSSBillboardContainer}
        options={{
          header: props => (
            <HeaderContainer
              backgroundColor="#1a1a1a"
              hasBackButton
              hasShazam
              {...props}
              hasTRAKLIST
            />
          ),
          title: 'LISTS',
        }}
      />
      <Stack.Screen
        name="complex"
        component={RSSComplexContainer}
        options={{
          header: props => (
            <HeaderContainer
              backgroundColor="#1a1a1a"
              hasBackButton
              hasShazam
              {...props}
              hasTRAKLIST
            />
          ),
          title: 'LISTS',
        }}
      />
      <Stack.Screen
        name="pitchfork"
        component={RSSPitchforkContainer}
        options={{
          header: props => (
            <HeaderContainer
              backgroundColor="#1a1a1a"
              hasBackButton
              hasShazam
              {...props}
              hasTRAKLIST
            />
          ),
          title: 'LISTS',
        }}
      />
      <Stack.Screen
        name="hotnewhiphop"
        component={RSSHotNewHipHopContainer}
        options={{
          header: props => (
            <HeaderContainer
              backgroundColor="#1a1a1a"
              hasBackButton
              hasShazam
              {...props}
              hasTRAKLIST
            />
          ),
          title: 'LISTS',
        }}
      />
      <Stack.Screen
        name="officialcharts"
        component={RSSOfficialChartsContainer}
        options={{
          header: props => (
            <HeaderContainer
              backgroundColor="#1a1a1a"
              hasBackButton
              hasShazam
              {...props}
              hasTRAKLIST
            />
          ),
          title: 'LISTS',
        }}
      />
      <Stack.Screen
        name="hypebeast"
        component={RSSHypebeastContainer}
        options={{
          header: props => (
            <HeaderContainer
              backgroundColor="#1a1a1a"
              hasBackButton
              hasShazam
              {...props}
              hasTRAKLIST
            />
          ),
          title: 'LISTS',
        }}
      />
      <Stack.Screen
        name="Basket"
        component={CheckoutInterface}
        options={{
          header: props => (
            <HeaderContainer
              backgroundColor="#1a1a1a"
              hasBackButton
              hasShazam
              {...props}
              hasTRAKLIST
            />
          ),
          title: 'Basket',
        }}
      />
      <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen
          name="Product"
          component={ProductContainer}
          options={{
            title: 'MAIN',
            header: props => (
              <View style={{marginTop: 10}}>
                <HeaderContainer hasTRAKLIST hasBackButton isModal {...props} />
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="TRX00"
          component={() => ForYouContainer({query: ''})}
          options={{
            title: 'MAIN',
            header: props => (
              <View style={{marginTop: 10}}>
                <HeaderContainer hasTRAKLIST hasBackButton isModal {...props} />
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="TRX01"
          component={ProductContainer}
          options={{
            title: 'MAIN',
            header: props => (
              <View style={{marginTop: 10}}>
                <HeaderContainer hasTRAKLIST hasBackButton isModal {...props} />
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="TRX02"
          component={() => OriginalsContainer({query: ''})}
          options={{
            title: 'MAIN',
            header: props => (
              <View style={{marginTop: 10}}>
                <HeaderContainer hasTRAKLIST hasBackButton isModal {...props} />
              </View>
            ),
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
