import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {InterfaceStack} from '../parent';

export const BernieAppStack = () => {
  return (
    <NavigationContainer>
      <InterfaceStack />
    </NavigationContainer>
  );
};
