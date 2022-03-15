import {
  SafeAreaView,
  Text,
  Image,
  View,
  Button,
  Pressable,
  TextInput,
} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const AuthenticationElement = ({
  handleChangeText,
  handleNavigateForchain,
}: any) => {
  return (
    <SafeAreaView style={{justifyContent: 'center', alignItems: 'center'}}>
      <TextInput
        style={{
          backgroundColor: '#cecece',
          width: '60%',
          height: 30,
          borderRadius: 10,
          padding: 8,
        }}
        onChangeText={handleChangeText}
      />
      <Button title="connect to forchain" onPress={handleNavigateForchain} />
    </SafeAreaView>
  );
};
