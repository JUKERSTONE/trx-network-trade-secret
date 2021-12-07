import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerContent} from './internal';
import {InterfaceStack} from './internal';

const Drawer = createDrawerNavigator();

export const BernieAppStack = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="INTERFACE" component={InterfaceStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
