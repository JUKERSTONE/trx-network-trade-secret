import React from 'react';
import {View, TextInput, Text, ScrollView} from 'react-native';
import {styles} from '../screen-wrapper/styles';
import {TokencyPicker, TokencyText} from './internal';

export const TokencyElement = ({...props}) => {
  return (
    <ScrollView>
      <TokencyPicker {...props} />
      <TokencyText name="TYPE" />
      <TokencyText name="ISRC" />
      <TokencyText name="SPOTIFY URI" />
    </ScrollView>
  );
};
