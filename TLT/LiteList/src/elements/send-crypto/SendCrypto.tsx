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

export const SendCryptoElement = ({
  currency,
  selectedValue,
  setSelectedValue,
  options,
  isVisible,
  onSelect,
  onCancel,
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
          backgroundColor: 'red',
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
              backgroundColor: '#1A1A1A',
              padding: 20,
              // width: '50%',
              borderRadius: 10,
              color: '#fff',
              fontWeight: 'bold',
              flex: 3,
              marginHorizontal: 10,
            }}
            // onChangeText={text => handleDetailsChange(text, 'phone_number')}
            placeholder="PHONE NUMBER"
            // value={details['phone_number']}
            keyboardType="phone-pad"
          />
          <Picker
            itemStyle={{height: 37, fontSize: 10}}
            style={{
              backgroundColor: '#1a1a1a',
              borderRadius: 5,
              flex: 1,
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
        <Button title="Choose recipent" onPress={() => onSelect()} />
        <ModalFilterPicker
          visible={isVisible}
          onSelect={onSelect}
          onCancel={onCancel}
          options={options}
        />
      </View>
      <View style={{backgroundColor: '#fff', flex: 1}}></View>
    </Pressable>
  );
};
