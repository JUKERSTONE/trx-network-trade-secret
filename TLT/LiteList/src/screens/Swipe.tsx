import {View, Text, Button} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';

export const SwipeScreen = () => {
  return (
    <View>
      <Button
        onPress={() =>
          auth()
            .signOut()
            .then(() => {
              // handleClear();
            })
        }
        title="sign out"
      />
      <Text>cosnt</Text>
    </View>
  );
};
