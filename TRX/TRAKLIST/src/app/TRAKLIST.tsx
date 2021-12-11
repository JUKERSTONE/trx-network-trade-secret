import React from 'react';
import {View, Text} from 'react-native';
import {TRAKLISTStack} from '../stacks';

export const TRAKLISTApp = ({...props}) => {
  return <TRAKLISTStack {...props} />;
};
