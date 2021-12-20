import React from 'react';
import {View, Text} from 'react-native';
import {DetailsElement} from '../../elements';
import {useDetails} from './useDetails';

export const DetailsContainer = ({...props}) => {
  const {...useDetailsProps} = useDetails();
  return <DetailsElement {...useDetailsProps} {...props} />;
};
