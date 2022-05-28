import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
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
      <KeyboardAvoidingView
        behavior="position"
        style={{
          height: '100%',
        }}>
        <View style={{padding: 15, backgroundColor: '#1a1a1a'}}>
          <VHeader type="three" color="#cecece" text={'PROFILE ESSENTIALS.'} />
          <Caption
            type="one"
            color="#cecece"
            text={'Lets begin building your profile.'}
          />
        </View>
        <View
          style={{
            backgroundColor: '#1a1a1a',
            height: '100%',
            padding: 10,
            paddingBottom: 100,
          }}>
          <View style={[{flexDirection: 'row'}, styles.inputContainer]}>
            <View style={{flex: 1, marginRight: 15}}>
              <TextInput
                onChangeText={text => handleDetailsChange(text, 'trak_name')}
                style={styles.input}
                placeholder="TRAK NAME (minimum 5 characters, unique username)"
              />
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {/* <Body
                  // numberOfLines={1}
                  type="one"
                  color={'#fff'}
                  text={'trak . btc'}
                /> */}
              </View>
            </View>
            <View>
              {/*  */}
              {/*  */}
            </View>
            <View style={{flex: 1}}>
              <TextInput
                onChangeText={text => handleDetailsChange(text, 'trak_symbol')}
                style={styles.input}
                placeholder="TRAK SYMBOL (e.g : BTC, ETH, TSB, etc.)"
              />
              <Caption
                // numberOfLines={1}
                type="two"
                color={'yellow'}
                text={'common trak symbols include btc, eth, sol, nft, etc'}
              />
            </View>
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
            <Caption
              // numberOfLines={1}
              type="two"
              color={'orange'}
              text={'some text about password strength'}
            />
          </View>
          <Button
            disabled={!hasRequiredDetails}
            title="next"
            onPress={handleNavigateNext}
          />
        </View>
      </KeyboardAvoidingView>
    </ParallaxScrollView>
  );
};
