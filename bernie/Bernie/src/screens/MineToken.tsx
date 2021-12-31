import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {MineTokenContainer} from '../containers';
import {ScreenWrapper} from '../elements';

export const MineTokenScreen = () => {
  const {width, height} = Dimensions.get('window');
  return (
    <ScreenWrapper>
      <MineTokenContainer />
    </ScreenWrapper>
  );
};
