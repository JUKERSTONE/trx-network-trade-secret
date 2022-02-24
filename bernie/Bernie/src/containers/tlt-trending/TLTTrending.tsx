import {View, Text} from 'react-native';
import React from 'react';

import {TLTTrendingElement} from '../../elements';
import {useTLTTrending} from './useTLTTrending';

export const TLTTrendingContainer = ({...props}) => {
  const {...useTLTTrendingProps} = useTLTTrending();
  return <TLTTrendingElement {...useTLTTrendingProps} {...props} />;
};
