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

export const AddMerchandiseElement = ({item, handleAddMerchandise}: any) => {
  console.log(
    '🚀 ~ file: NFTDashboard.tsx ~ line 20 ~ NFTDashboardElement ~ item',
    item,
  );
  return (
    <SafeAreaView style={{backgroundColor: '#cecece', flex: 1}}>
      {/*  */}
      <Text>Add Merchandise</Text>
      <Button title="add" onPress={handleAddMerchandise} />
    </SafeAreaView>
  );
};
