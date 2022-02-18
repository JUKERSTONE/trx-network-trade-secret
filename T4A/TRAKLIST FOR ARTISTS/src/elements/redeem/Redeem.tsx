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

export const RedeemElement = ({
  handleNavigateNext,
  handleUploadAudio,
  handleUploadImage,
  handleNFTCopiesInput,
  handleNFTValueInput,
}: any) => {
  return (
    <SafeAreaView>
      <Button title="upload audio" onPress={handleUploadAudio} />
      <Button title="upload image" onPress={handleUploadImage} />
      <TextInput placeholder="NFT Value" onChangeText={handleNFTValueInput} />
      <TextInput
        placeholder="Number of NFT Copies "
        onChangeText={handleNFTCopiesInput}
      />
      <Text>Proof of identity</Text>
      <Button title="next" onPress={handleNavigateNext} />
    </SafeAreaView>
  );
};
