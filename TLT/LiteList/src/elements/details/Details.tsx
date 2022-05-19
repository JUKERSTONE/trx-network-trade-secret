import React from 'react';
import {View, Text, TextInput, Button, StyleSheet, Image} from 'react-native';
import {styles} from './styles';
// @ts-ignore
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import {VHeader, BHeader, Body, Caption} from '../../elements';

export const DetailsElement = ({
  handleDetailsChange,
  hasRequiredDetails,
  handleNavigateNext,
}: any) => {
  return (
    <ParallaxScrollView
      backgroundColor={'#1a1a1a'}
      parallaxHeaderHeight={200}
      stickyHeaderHeight={150}
      renderBackground={() => (
        <LinearGradient colors={['#1a1a1a', '#000']}>
          <View
            style={{
              height: 200,
              alignItems: 'center',
              justifyContent: 'space-around',
              borderBottomWidth: 1.8,
              // borderColor: '#fff',
            }}>
            <Image
              style={{
                height: '100%',
                width: '100%',
                marginTop: 3,
                borderRadius: 8,
              }}
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/euphoric_man%402x.png?alt=media&token=f591e9f0-9739-4b15-ab81-e3bb17444b2e',
              }}
            />

            {/*  */}
          </View>
        </LinearGradient>
      )}>
      <View style={{backgroundColor: '#1a1a1a', height: '100%', padding: 10}}>
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
    </ParallaxScrollView>
  );
};
