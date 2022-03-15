import {SafeAreaView, Text, Image, View, Pressable} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const HeaderElement = ({
  handleDeposit,
  hasBackButton = false,
  handleGoBack,
}: any) => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: '#1a1a1a',
        height: 100,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <View
        style={{
          paddingHorizontal: 5,
          flexDirection: 'row',
        }}>
        {hasBackButton ? (
          <Pressable onPress={handleGoBack}>
            <MaterialCommunityIcons
              name={'backspace'}
              size={28}
              color={'whitesmoke'}
              style={{opacity: 0.9, paddingTop: 0}}
            />
          </Pressable>
        ) : (
          <Pressable /*onPress={handleMenu}*/>
            <MaterialCommunityIcons
              name={'microsoft-xbox-controller-menu'}
              size={28}
              color={'whitesmoke'}
              style={{opacity: 0.9, paddingTop: 0}}
            />
          </Pressable>
        )}

        <View style={{height: '100%', width: '65%', paddingLeft: 35}}>
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
        <View style={{flexDirection: 'row'}}>
          <Pressable /*onPress={handleMenu}*/ style={{marginRight: 10}}>
            <MaterialCommunityIcons
              name={'card-search'}
              size={30}
              color={'whitesmoke'}
              style={{opacity: 0.9, paddingTop: 0}}
            />
          </Pressable>
          <Pressable onPress={handleDeposit}>
            <MaterialCommunityIcons
              name={'cash-usd'}
              size={30}
              color={'whitesmoke'}
              style={{opacity: 0.9, paddingTop: 0}}
            />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};
