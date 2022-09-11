import React from 'react';
import {View, Text} from 'react-native';
import {LastPlayedElement} from '../../elements';
import {useLastPlayed} from './useLastPlayed';

export const LastPlayedContainer = ({navigation, route, ...props}: any) => {
  const {...useLastPlayedProps} = useLastPlayed({navigation, route});
  return <LastPlayedElement {...useLastPlayedProps} {...props} />;
};
