import React from 'react';
import {View, TextInput, Text, ScrollView} from 'react-native';
import {styles} from '../screen-wrapper/styles';
import {TokencyPicker, TokencyText, TokencyAction} from './internal';

export const MineTokenElement = ({...props}) => {
  return (
    <ScrollView>
      <TokencyText name="ARTIST QUERY" {...props} />
      <TokencyAction name="MINE" {...props} />
    </ScrollView>
  );
};
