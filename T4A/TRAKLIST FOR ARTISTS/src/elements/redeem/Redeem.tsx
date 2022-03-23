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
import {BernieText} from '../../elements';

export const RedeemElement = ({
  handleNavigateNext,
  handleUploadAudio,
  handleUploadImage,
  handleNFTCopiesInput,
  handleNavigateProduct,
}: any) => {
  return (
    <SafeAreaView
      style={{backgroundColor: '#1a1a1a', flex: 1, justifyContent: 'center'}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>NFT Copies</Text>
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder={'number of copies'}
            style={{color: 'whitesmoke', fontWeight: '600'}}
            onChangeText={handleNFTCopiesInput}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginBottom: 20,
          paddingTop: 15,
          paddingBottom: 15,
          marginHorizontal: 20,
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: 'grey',
        }}>
        <Button title="upload audio" onPress={handleUploadAudio} />
        <Button title="upload image" onPress={handleUploadImage} />
      </View>
      <Button title="next" onPress={handleNavigateProduct} />
    </SafeAreaView>
  );
};
