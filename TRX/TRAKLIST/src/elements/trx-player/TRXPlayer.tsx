import {View, Text} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const TRXPlayer = () => {
  return (
    <View
      style={{
        marginTop: 5,
        backgroundColor: '#1d995F',
        height: 80,
        flexDirection: 'row',
        opacity: 0.8,
      }}>
      <View style={{flex: 1, padding: 10}}>
        {/* replace view */}
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            borderBottomLeftRadius: 30,
          }}
        />
      </View>
      <View
        style={{
          flex: 3,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>song title</Text>
        <Text>song artist</Text>
      </View>
      <View style={{flex: 1, padding: 10, flexDirection: 'row'}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 5,
          }}>
          <MaterialCommunityIcons
            name={'play-circle'}
            size={25}
            color={'whitesmoke'}
            style={{opacity: 0.9, paddingTop: 0}}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <MaterialIcons
            name={'replay-circle-filled'}
            size={25}
            color={'whitesmoke'}
            style={{opacity: 0.9, paddingTop: 0}}
          />
        </View>
      </View>
    </View>
  );
};
