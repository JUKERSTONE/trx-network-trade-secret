import {SafeAreaView, Text, Button} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {useAsyncStorage, toggleExchangeView, store} from '../stores';

export const Main = () => {
  const {handleClear} = useAsyncStorage();

  return (
    <SafeAreaView>
      <Text>Main</Text>
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
