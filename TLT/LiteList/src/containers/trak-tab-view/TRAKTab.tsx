import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {TRAKTabElement} from '../../elements';
import {useTRAKTab} from './useTRAKTab';

export const TRAKTabContainer = ({query, navigation, ...props}: any) => {
  const {...useTRAKTabProps} = useTRAKTab({query, navigation});
  return <TRAKTabElement {...useTRAKTabProps} {...props} />;
};
