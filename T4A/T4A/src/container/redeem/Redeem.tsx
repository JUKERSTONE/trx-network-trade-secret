import React from 'react';
import {View, Text} from 'react-native';
import {RedeemElement} from '../../elements';
import {useRedeem} from './useRedeem';

export const RedeemContainer = ({navigation, route, ...props}: any) => {
  alert(JSON.stringify(route));
  const {...useRedeemProps} = useRedeem({navigation});
  return <RedeemElement {...useRedeemProps} {...props} />;
};
