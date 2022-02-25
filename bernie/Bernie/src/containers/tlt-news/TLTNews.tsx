import {View, Text} from 'react-native';
import React from 'react';

import {TLTNewsElement} from '../../elements';
import {useTLTNews} from './useTLTNews';

export const TLTNewsContainer = ({...props}) => {
  const {...useTLTNewsProps} = useTLTNews();
  return <TLTNewsElement {...useTLTNewsProps} {...props} />;
};
