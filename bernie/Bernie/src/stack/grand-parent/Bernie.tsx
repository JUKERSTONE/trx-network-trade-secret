import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerContent} from './internal';
import {InterfaceStack} from '../parent';

const Drawer = createDrawerNavigator();

export const BernieAppStack = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="BERNIE & FRIENDS" component={InterfaceStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
