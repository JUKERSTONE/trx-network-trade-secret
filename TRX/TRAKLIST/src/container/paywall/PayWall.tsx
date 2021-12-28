import React from 'react';
import {View, Text} from 'react-native';
import {PayWallElement} from '../../elements';
import {usePayWall} from './usePayWall';

export const PayWallContainer = ({...props}) => {
  const {...usePayWallProps} = usePayWall();
  return <PayWallElement {...usePayWallProps} {...props} />;
};
