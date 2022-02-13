import {View, Text} from 'react-native';
import React from 'react';
import {TRXModalElement} from '../../elements';
import {useTRXModal} from './useTRXModal';

export const TRXModalContainer = ({...props}) => {
  const {...useTRXModalProps} = useTRXModal();
  return <TRXModalElement {...useTRXModalProps} {...props} />;
};
