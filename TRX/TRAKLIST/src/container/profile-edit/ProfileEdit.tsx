import React from 'react';
import {View, Text} from 'react-native';
import {ProfileEditElement} from '../../elements';
import {useProfileEdit} from './useProfileEdit';

export const ProfileEditContainer = ({...props}) => {
  const {...useProfileEditProps} = useProfileEdit();
  return <ProfileEditElement {...useProfileEditProps} {...props} />;
};
