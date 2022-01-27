import React from 'react';
import {
  View,
  TextInput,
  Text,
  ScrollView,
  Button,
  FlatList,
  Pressable,
  Image,
} from 'react-native';
// import {VHeader, Body} from '../../elements';

export const VerifyNFTElement = ({
  NFTRequest,
  handleVerifyNFT,
  ...props
}: any) => {
  return (
    <>
      <Text>{JSON.stringify(NFTRequest)}</Text>
      <Button title="VERIFY" onPress={handleVerifyNFT} />
    </>
  );
};
