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
  console.log('🚀 ~ file: VerifyNFT.tsx:20 ~ NFTRequest:', NFTRequest);
  return (
    <>
      <Text style={{margin: 5}}>Artist : {NFTRequest.artist}</Text>
      <Text style={{margin: 5}}>Title : {NFTRequest.title}</Text>
      <Text style={{margin: 5}}>Audio : {NFTRequest.trakAUDIO}</Text>
      <Text style={{margin: 5}}>NFTFileName : {NFTRequest.NFTFileName}</Text>
      <Text style={{margin: 5}}>cover_art : {NFTRequest.cover_art}</Text>
      <Text style={{margin: 5}}>
        isOriginal : {NFTRequest.isOriginal.toString()}
      </Text>
      <Text style={{margin: 5}}>userId : {NFTRequest.userID}</Text>

      <Button title="VERIFY" onPress={() => handleVerifyNFT({NFTRequest})} />
      <Button title="DECLINE" onPress={() => handleDeclineNFT({NFTRequest})} />
    </>
  );
};
