import React, {useEffect, useRef} from 'react';
import {
  TextInput,
  SafeAreaView,
  ImageBackground,
  FlatList,
  Keyboard,
  Button,
  Image,
} from 'react-native';
// @ts-ignore
import {TrendingCard} from '../trending-card/TrendingCard';
import {View, Text, Pressable} from 'react-native';
import {VHeader, Body, Caption, BHeader} from '../typography';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {Picker} from '@react-native-picker/picker';
import ModalFilterPicker from 'react-native-modal-filter-picker';
import {WebView} from 'react-native-webview';

export const SendCryptoElement = ({
  currency,
  selectedValue,
  setSelectedValue,
  options,
  isVisible,
  handleChooseRecipient,
  handleSelectReceipient,
  handleCancel,
  recipient,
  handleSubmitTransaction,
  ...props
}: any) => {
  const keyboard = useRef(null);

  useEffect(() => {
    keyboard.current.focus();
  }, []);

  return (
    <Pressable
      style={{backgroundColor: '#1a1a1a', flex: 1}}
      onPress={() => Keyboard.dismiss()}>
      <View
        style={{
          flex: 1,
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TextInput
            ref={keyboard}
            style={{
              backgroundColor: '#fff',
              padding: 20,
              // width: '50%',
              borderRadius: 10,
              color: '#1a1a1a',
              fontWeight: 'bold',
              // flex: 3,
              marginHorizontal: 10,
            }}
            // onChangeText={text => handleDetailsChange(text, 'phone_number')}
            placeholder="AMOUNT"
            // value={details['phone_number']}
            keyboardType="numeric"
          />
          <Picker
            itemStyle={{height: 37, fontSize: 10}}
            style={{
              backgroundColor: '#fff',
              borderRadius: 5,
              width: 100,
              marginHorizontal: 10,
            }}
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }>
            {currency.map((item: any) => {
              return <Picker.Item label={item.label} value={item.value} />;
            })}
          </Picker>
        </View>
        <View style={{height: 70}}>
          <WebView
            source={{uri: 'https://tsb.media/walter/stacks/connect'}}
            onMessage={(event: any) => alert('op')}
            // style={{height: 50}}
          />
        </View>
        {recipient.key && (
          <Button title={'send'} onPress={() => handleSubmitTransaction()} />
        )}
        <Button
          title={recipient.key ? 'Change recipient' : 'Choose recipent'}
          onPress={() => handleChooseRecipient()}
        />
        <View style={{alignItems: 'center'}}>
          <Text style={{color: 'white'}}>{recipient.label}</Text>
          <Text style={{color: 'white'}}>{recipient.key}</Text>
        </View>
        <ModalFilterPicker
          visible={isVisible}
          onSelect={handleSelectReceipient}
          onCancel={handleCancel}
          options={options}
        />
      </View>
      <View style={{backgroundColor: '#1a1a1a', flex: 1}}></View>
    </Pressable>
  );
};
