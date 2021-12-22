import React from 'react';
import {View, Text} from 'react-native';
import {SeedElement} from '../../elements';
import {useSeed} from './useSeed';
import {useSelector} from 'react-redux';

export const SeedContainer = ({...props}) => {
  const {...useSeedProps} = useSeed();
  return <SeedElement {...useSeedProps} {...props} />;
};
