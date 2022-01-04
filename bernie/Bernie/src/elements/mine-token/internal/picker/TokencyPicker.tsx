import React from 'react';
import {View, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {styles} from './styles';

export const TokencyPicker = ({
  title,
  pickerData,
  selectedValue,
  setSelectedValue,
}: any) => {
  console.log(
    '🚀 ~ file: TokencyPicker.tsx ~ line 11 ~ pickerData',
    pickerData,
  );
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
        {pickerData.map((item: any) => {
          console.log(
            '🚀 ~ file: TokencyPicker.tsx ~ line 26 ~ {pickerData.map ~ item',
            item,
          );
          return <Picker.Item label={item.label} value={item.value} />;
        })}
        {/* <Picker.Item label="JKX" value="JKX" />
        <Picker.Item label="PTX" value="PTX" /> */}
      </Picker>
    </View>
  );
};
