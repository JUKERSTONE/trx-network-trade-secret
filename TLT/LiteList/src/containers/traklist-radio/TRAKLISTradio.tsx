import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {TRAKLISTradioElement} from '../../elements';
import {useTRAKLISTradio} from './useTRAKLISTradio';

export const TRAKLISTradioContainer = ({navigation, ...props}: any) => {
  const {...useTRADIOProps} = useTRAKLISTradio({navigation});
  return <TRAKLISTradioElement {...useTRADIOProps} {...props} />;
};
