import React from 'react';
import {View, Button} from 'react-native';
import {useAuthentication} from '../../authentication';

export const RegisterConnectTabElement = () => {
  const {useGoogle, useSpotify, useMusicKit} = useAuthentication();
  const {authorizeGoogle, refreshedState, revokeState} = useGoogle();
  const {authorizeSpotify} = useSpotify();
  const {initialize} = useMusicKit();
  return (
    <View>
      <Button title="spotify" onPress={() => authorizeSpotify()} />
      <Button title="google" onPress={() => authorizeGoogle()} />
      <Button title="apple music" onPress={() => initialize()} />
    </View>
  );
};
