import React from 'react';
import {View, Text, Button, SafeAreaView} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useAsyncStorage} from '../stores';

export const Main = () => {
  const {handleClear} = useAsyncStorage();
  return (
    <SafeAreaView>
      <Button
        onPress={() => {
          auth()
            .signOut()
            .then(() => {
              console.log('User signed out!');
              handleClear();
            });
        }}
        title="Sign out"
      />
    </SafeAreaView>
  );
};
