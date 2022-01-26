import React from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  ActivityIndicator,
  Dimensions,
  Pressable,
  Image,
  TextInput,
  SafeAreaView,
} from 'react-native';
import {styles} from './styles';
import {VHeader, Body} from '../typography';

export const RedeemElement = ({handleNavigateNext}: any) => {
  return (
    <SafeAreaView>
      <Text>Proof of identity</Text>
      <Button title="next" onPress={handleNavigateNext} />
    </SafeAreaView>
  );
};
