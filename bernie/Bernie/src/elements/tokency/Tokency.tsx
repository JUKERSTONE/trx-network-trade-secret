import React from 'react';
import {View, TextInput, Text, ScrollView, Button} from 'react-native';
import {styles} from '../screen-wrapper/styles';
import {TokencyPicker, TokencyText} from './internal';

export const TokencyElement = ({navigation, ...props}: any) => {
  return (
    <ScrollView>
      <Button
        title="mine + mint"
        onPress={() => navigation.navigate('MINE_TOKEN')}
      />
      <Button
        title="query + edit"
        onPress={() => navigation.navigate('SET_TOKEN')}
      />
    </ScrollView>
  );
};
