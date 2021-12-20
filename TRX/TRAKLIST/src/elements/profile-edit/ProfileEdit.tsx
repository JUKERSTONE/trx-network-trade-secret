import React from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {styles} from './styles';

export const ProfileEditElement = ({
  handleProfileEditChange,
  hasRequiredDetails,
  navigation,
}: any) => {
  return (
    <View>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={text => handleProfileEditChange(text, 'user_name')}
          style={styles.input}
          placeholder="USERNAME (minimum 1 character)"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={text => handleProfileEditChange(text, 'bio')}
          style={styles.input}
          placeholder="BIO"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={text => handleProfileEditChange(text, 'quotable')}
          placeholder="QUOTABLE"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={text => handleProfileEditChange(text, 'location')}
          placeholder="LOCATION"
        />
      </View>

      <Button
        disabled={!hasRequiredDetails}
        title="next"
        onPress={() => navigation.navigate('ONBOARD')}
      />
    </View>
  );
};
