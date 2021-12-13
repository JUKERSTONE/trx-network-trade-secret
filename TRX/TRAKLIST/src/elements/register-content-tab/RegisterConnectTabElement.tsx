import React from 'react';
import {View, Button} from 'react-native';
import {useSpotify} from '../../authentication';
import {useGoogle} from '../../authentication';

export const RegisterConnectTabElement = () => {
  const {authorizeSpotify} = useSpotify();
  const {authorizeGoogle} = useGoogle();
  return (
    <View>
      <Button title="spotify" onPress={() => authorizeSpotify()} />
      <Button title="google" onPress={() => authorizeGoogle()} />
    </View>
  );
};
