import React from 'react';
import {View, Text, Button} from 'react-native';

export const ConnectElement = ({
  authorizeSpotify,
  authorizeGoogle,
  isAuthenticatedSpotify,
  navigation,
}: any) => {
  return (
    <View>
      <Button title="spotify" onPress={() => authorizeSpotify()} />
      <Button title="google" onPress={() => authorizeGoogle()} />
      {/* <Button title="apple music" onPress={() => initialize()} /> */}
      <Button
        disabled={!isAuthenticatedSpotify}
        title="next"
        onPress={() => navigation.navigate('DETAILS')}
      />
    </View>
  );
};
