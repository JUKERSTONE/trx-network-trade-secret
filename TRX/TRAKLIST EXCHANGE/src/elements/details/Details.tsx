import React from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {styles} from './styles';

export const DetailsElement = ({
  handleDetailsChange,
  hasRequiredDetails,
  handleNavigateNext,
}: any) => {
  return (
    <View>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={text => handleDetailsChange(text, 'trak_name')}
          style={styles.input}
          placeholder="TRAK NAME (minimum 5 characters, unique username)"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={text => handleDetailsChange(text, 'trak_symbol')}
          style={styles.input}
          placeholder="TRAK SYMBOL (e.g : BTC, ETH, TSB, etc.)"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={text => handleDetailsChange(text, 'phone_number')}
          placeholder="PHONE NUMBER"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={text => handleDetailsChange(text, 'email_address')}
          placeholder="EMAIL ADDRESS"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={text =>
            handleDetailsChange(text, 'confirm_email_address')
          }
          placeholder="CONFIRM EMAIL ADDRESS"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={text => handleDetailsChange(text, 'password')}
          placeholder="PASSWORD"
        />
      </View>
      <Button
        disabled={!hasRequiredDetails}
        title="next"
        onPress={handleNavigateNext}
      />
    </View>
  );
};
