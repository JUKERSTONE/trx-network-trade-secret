import React, {useEffect, useState, useContext} from 'react';
import {Alert} from 'react-native';

export const useWalletTab = ({navigation, title, artist}: any) => {
  const handleExchange = ({trak}: any) => {
    Alert.alert(
      'Pending TRX Exchange',
      `You are about to swap '${title}' by ${artist} for '${trak.title}' by ${trak.artist}`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'EXCHANGE',
          onPress: () => navigation.navigate('WALLET+'),
        },
      ],
    );
  };

  return {
    handleExchange,
  };
};
