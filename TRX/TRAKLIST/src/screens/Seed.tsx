import React from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import {SeedContainer} from '../container';

export const SeedScreen = ({...props}) => {
  console.log('🚀 ~ file: Seed.tsx ~ line 6 ~ SeedScreen ~ props', props);
  return <SeedContainer {...props} />;
};
