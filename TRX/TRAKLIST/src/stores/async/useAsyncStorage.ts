import React, {useEffect, useState, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAsyncStorage = () => {
  const handleStore = async ({key, value}: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      // saving error

      return false;
    }
  };

  const handleGet = async ({key}: any) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // value previously stored
        return value;
      }
    } catch (e) {
      // error reading value
      return false;
    }
  };

  return {
    handleStore,
    handleGet,
  };
};
