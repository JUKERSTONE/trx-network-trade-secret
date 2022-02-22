import React from 'react';
import {
  View,
  Text,
  Dimensions,
  Pressable,
  SafeAreaView,
  Image,
} from 'react-native';
import {TapeView} from '../../6.containers';
import {TraklistApp} from '../../6.containers/hooks/traklist-app/TraklistApp';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface TTape {
  navigation: any;
  route: any;
}
export const Tape: React.FC<TTape> = ({...props}) => {
  return (
    <TraklistApp {...props} hasPlayer={false}>
      <SafeAreaView
        style={{
          // position: 'absolute',
          // top: 0,
          // left: 0,
          width: '100%',
          height: 80,
          justifyContent: 'space-between',
          // paddingHorizontal: 30,
          alignItems: 'center',
          flexDirection: 'row',
          backgroundColor: '#1a1a1a',
          marginBottom: 10,
        }}>
        <Pressable onPress={() => props.navigation.goBack()}>
          <MaterialIcons
            name={'arrow-back-ios'}
            size={23}
            color={'whitesmoke'}
            style={{opacity: 0.9, paddingLeft: 20}}
          />
        </Pressable>
        <Image
          style={{
            height: 200,
            width: 200,
            marginTop: 8,
            borderRadius: 15,
          }}
          source={{
            uri: 'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/poster_black.png?alt=media',
          }}
        />
        <Pressable onPress={() => alert('toggle discover settings')}>
          <MaterialIcons
            name={'settings'}
            size={23}
            color={'whitesmoke'}
            style={{opacity: 0.9, paddingRight: 20}}
          />
        </Pressable>
      </SafeAreaView>
      <TapeView {...props} />
    </TraklistApp>
  );
};
