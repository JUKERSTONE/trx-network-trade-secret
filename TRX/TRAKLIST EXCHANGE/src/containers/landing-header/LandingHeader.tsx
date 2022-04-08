import React from 'react';
import {View, Text} from 'react-native';
import {LandingHeader} from '../../elements';
import {useLandingHeader} from './useLandingHeader';

export const LandingHeaderView = ({handleSearchQuery, ...props}: any) => {
  const {...useHeaderProps} = useLandingHeader();
  return (
    <LandingHeader
      handleSearchQuery={handleSearchQuery}
      {...props}
      {...useHeaderProps}
    />
  );
};
