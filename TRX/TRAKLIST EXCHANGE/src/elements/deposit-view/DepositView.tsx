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
// @ts-ignore
import {Picker} from '@react-native-picker/picker';
import {CardField, useStripe} from '@stripe/stripe-react-native';

export const DepositView = ({state}: any) => {
  const {confirmPayment} = useStripe();
  const [selectedToken, setSelectedToken] = useState('GBP');
  const [value, setValue] = useState('0.5');
  const handleDeposit = () => {
    const action = depositMoney(500);
    store.dispatch(action);
  };
  const handleDepositTest = () => {
    //
    //
  };

  const handleChangeText = (text: any) => {
    setValue(text);
  };

  return (
    <View style={{flex: 1, width: '100%', backgroundColor: '#1a1a1a'}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>DEPOSIT MONEY</Text>
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            keyboardType="number-pad"
            value={value}
            placeholder={'$TRX'}
            onChangeText={handleChangeText}
          />
        </View>
        <Picker
          selectedValue={selectedToken}
          onValueChange={(itemValue, itemIndex) => setSelectedToken(itemValue)}>
          <Picker.Item label="US" value="USD" />
          <Picker.Item label="GB" value="GBP" />
        </Picker>
      </View>
      <Button title="deposit" onPress={handleDeposit} />
      <Button title="deposit test" onPress={handleDepositTest} />

      <CardField
        postalCodeEnabled={false}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
        }}
        style={{
          width: '100%',
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={cardDetails => {
          console.log('cardDetails', cardDetails);
          // alert(JSON.stringify(cardDetails));
        }}
        onFocus={focusedField => {
          console.log('focusField', focusedField);
        }}
      />
    </View>
  );
};
