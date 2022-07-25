import {SafeAreaView, Text, Image, View, Pressable} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {VHeader} from '../typography';

export const HeaderElement = ({
  handleDeposit,
  hasBackButton = false,
  handleGoBack,
  handleAuthentication,
  isLoggedIn,
  isModal,
  handleProfile,
  handleCloseModal,
  navigation,
  TRXProfile,
}: any) => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: '#333333',
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
        }}>
        <View style={{flexDirection: 'row', flex: 1, justifyContent: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              // backgroundColor: isLoggedIn ? 'silver' : 'green',
              minWidth: 80,
              paddingRight: 8,
              borderRadius: 10,
              borderColor: isLoggedIn ? '#fff' : 'transparent',
              justifyContent: 'center',
            }}>
            {hasBackButton ? (
              <Pressable onPress={handleGoBack} style={{flexDirection: 'row'}}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 2,
                    marginRight: 7,
                    // flex: 1,
                  }}>
                  <VHeader
                    type="five"
                    color={isLoggedIn ? '#fff' : '#fff'}
                    text={'BACK'}
                  />
                </View>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <MaterialCommunityIcons
                    name={'backspace'}
                    size={23}
                    color={'#fff'}
                    style={{opacity: 0.9, paddingTop: 0}}
                  />
                </View>
              </Pressable>
            ) : (
              <Pressable onPress={handleProfile} style={{flexDirection: 'row'}}>
                <Image
                  style={{
                    alignSelf: 'center',
                    width: 32,
                    height: 32,
                    marginRight: 7,
                    borderRadius: 15,
                    borderWidth: 2.7,
                    borderColor: '#fff',
                  }}
                  source={{uri: TRXProfile.avatarURL}}
                />
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 2,
                    // flex: 1,
                  }}>
                  <VHeader
                    type="five"
                    color={isLoggedIn ? '#fff' : '#fff'}
                    text={TRXProfile.trak_name}
                  />
                </View>
              </Pressable>
            )}
          </View>
        </View>
        <View style={{flex: 1}}>
          <Image
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/poster_black.png?alt=media',
            }}
            style={{
              flex: 1,
              backgroundColor: '#333333',
              paddingLeft: 0,
              borderRadius: 15,
              borderWidth: 2.5,
              borderColor: 'whitesmoke',
            }}
          />
        </View>
        <View style={{flexDirection: 'row', flex: 1, justifyContent: 'center'}}>
          <Pressable onPress={() => handleAuthentication(isModal)}>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: isLoggedIn ? '#1a1a1a' : 'green',
                paddingHorizontal: 8,
                paddingVertical: 2,
                borderRadius: 10,
                // borderWidth: 3,
                // borderColor: isLoggedIn ? '#1a1a1a' : 'transparent',
                borderWidth: 2.5,
                borderColor: 'whitesmoke',
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 2,
                  marginRight: 7,

                  // flex: 1,
                }}>
                <VHeader
                  type="five"
                  color={isLoggedIn ? 'red' : '#fff'}
                  text={isLoggedIn ? 'SIGN OUT' : 'SIGN IN'}
                />
              </View>

              <FontAwesome
                name={isLoggedIn ? 'sign-out' : 'sign-in'}
                size={25}
                color={isLoggedIn ? 'red' : '#fff'}
                style={{opacity: 0.9, paddingTop: 0}}
              />
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};
