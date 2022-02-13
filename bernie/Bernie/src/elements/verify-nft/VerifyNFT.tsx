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
  handleDeclineNFT,
  ...props
}: any) => {
  return (
    <>
      <Text>{JSON.stringify(NFTRequest)}</Text>
      <Button title="VERIFY" onPress={() => handleVerifyNFT({NFTRequest})} />
      <Button title="DECLINE" onPress={() => handleDeclineNFT({NFTRequest})} />
    </>
  );
};
