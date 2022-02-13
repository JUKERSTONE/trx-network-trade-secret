import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  Alert,
  TextInput,
  Button,
} from 'react-native';
import {styles} from './styles';
import {store, depositMoney} from '../../stores';

export const DepositView = ({state}: any) => {
  const handleDeposit = () => {
    const action = depositMoney(500);
    store.dispatch(action);
  };

  return (
    <View style={{flex: 1, width: '100%'}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>DEPOSIT MONEY</Text>
        </View>
        <View style={styles.inputWrapper}>
          <TextInput placeholder={'$TRX'} />
        </View>
      </View>
      <Button title="deposit" onPress={handleDeposit} />
    </View>
  );
};
