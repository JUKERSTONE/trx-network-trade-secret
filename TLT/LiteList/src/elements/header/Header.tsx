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
}: any) => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: '#1a1a1a',
        height: 100,
        alignItems: 'center',
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
              backgroundColor: isLoggedIn ? '#fff' : 'green',
              paddingHorizontal: 8,
              paddingVertical: 1,
              borderRadius: 6.67,
              borderWidth: 2,
              borderColor: isLoggedIn ? 'whitesmoke' : 'transparent',
            }}>
            {hasBackButton ? (
              <>
                <Pressable
                  onPress={handleGoBack}
                  style={{flexDirection: 'row'}}>
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
                      color={isLoggedIn ? '#1a1a1a' : '#fff'}
                      text={'BACK'}
                    />
                  </View>
                  <MaterialCommunityIcons
                    name={'backspace'}
                    size={23}
                    color={'#1a1a1a'}
                    style={{opacity: 0.9, paddingTop: 0}}
                  />
                </Pressable>
              </>
            ) : (
              <Pressable onPress={handleProfile} style={{flexDirection: 'row'}}>
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
                    color={isLoggedIn ? '#1a1a1a' : '#fff'}
                    text={'USER'}
                  />
                </View>
                <FontAwesome
                  name={'user'}
                  size={25}
                  color={'#1a1a1a'}
                  style={{opacity: 0.9, paddingTop: 0}}
                />
              </Pressable>
            )}
          </View>
        </View>
        <View style={{flex: 1.5}}>
          <Image
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/poster_black.png?alt=media',
            }}
            style={{
              flex: 1,
              backgroundColor: '#1A1A1A',
              paddingLeft: 0,
            }}
          />
        </View>
        <View style={{flexDirection: 'row', flex: 1, justifyContent: 'center'}}>
          <Pressable onPress={() => handleAuthentication(isModal)}>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: isLoggedIn ? '#fff' : 'green',
                paddingHorizontal: 8,
                borderRadius: 6.67,
                borderWidth: 2,
                borderColor: isLoggedIn ? 'whitesmoke' : 'transparent',
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
                  color={isLoggedIn ? '#1a1a1a' : '#fff'}
                  text={isLoggedIn ? 'SIGN OUT' : 'SIGN IN'}
                />
              </View>

              <FontAwesome
                name={isLoggedIn ? 'sign-out' : 'sign-in'}
                size={25}
                color={isLoggedIn ? '#1a1a1a' : '#fff'}
                style={{opacity: 0.9, paddingTop: 0}}
              />
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};
