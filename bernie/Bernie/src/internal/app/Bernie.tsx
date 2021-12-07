import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerContent} from './internal';
import {BernieAppStack} from '../stack';

export const BernieApp = () => {
  return <BernieAppStack />;
};
