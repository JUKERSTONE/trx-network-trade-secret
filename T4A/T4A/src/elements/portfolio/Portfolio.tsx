import React from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  ActivityIndicator,
  Dimensions,
  Pressable,
  Image,
  TextInput,
  SafeAreaView,
} from 'react-native';
import {styles} from './styles';
import {VHeader, Body} from '../typography';

export const PortfolioElement = ({
  bank,
  handleExchangeTRAK,
  title,
  artist,
}: any) => {
  return (
    <SafeAreaView style={{backgroundColor: '#1a1a1a'}}>
      <FlatList
        data={bank}
        // style={{height: '84%'}}
        renderItem={({item}) => {
          // console.log('🚀 ~ file: Seed.tsx ~ line 110 ~ item', item);

          return (
            <Pressable
              onPress={() => handleExchangeTRAK({item, title, artist})}>
              <View
                style={{
                  margin: 10,
                }}>
                <View
                  style={{
                    height: 80,
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      justifyContent: 'flex-end',
                      marginRight: 20,
                      // backgroundColor: 'blue',
                      flex: 1,
                    }}>
                    <Image
                      source={{uri: item.thumbnail}}
                      style={{
                        backgroundColor: '#1B4F26',
                        height: '100%',
                        width: '100%',
                        borderRadius: 10,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      marginRight: 25,
                      backgroundColor: 'transparent',
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                      maxWidth: '60%',
                    }}>
                    <VHeader
                      numberOfLines={1}
                      type="four"
                      color={'#fff'}
                      text={item.title}
                    />
                    <Body
                      numberOfLines={1}
                      type="one"
                      color={'#fff'}
                      text={item.artist}
                      textAlign="right"
                    />
                  </View>
                </View>
              </View>
            </Pressable>
          );
        }}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};
