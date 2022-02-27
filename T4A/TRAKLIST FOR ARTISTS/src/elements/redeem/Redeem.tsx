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
    <SafeAreaView>
      <Button title="upload audio" onPress={handleUploadAudio} />
      <Button title="upload image" onPress={handleUploadImage} />
      <BernieText name="NFT Copies" handleChangeText={handleNFTCopiesInput} />
      <Text>Proof of identity</Text>
      <Button title="next" onPress={handleNavigateNext} />
      <Button title="product next" onPress={handleNavigateProduct} />
    </SafeAreaView>
  );
};
