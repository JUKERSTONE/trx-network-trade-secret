import React from 'react';
import {View, Text, Button, SafeAreaView} from 'react-native';
import auth from '@react-native-firebase/auth';

export const Main = () => {
  return (
    <SafeAreaView>
      <Button
        onPress={() => {
          auth()
            .signOut()
            .then(() => console.log('User signed out!'));
        }}
        title="Sign out"
      />
    </SafeAreaView>
  );
};
