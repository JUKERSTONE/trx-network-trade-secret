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
} from 'react-native';
import {styles} from './styles';
import {VHeader, Body} from '../typography';

export const ExchangeElement = ({
  bank,
  handleExchangeTRAK,
  title,
  artist,
}: any) => {
  if (bank == null)
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: Dimensions.get('screen').height,
        }}>
        <ActivityIndicator color="blue" size="small" />
      </View>
    );
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Search EXCHANGE</Text>
        </View>
        <View style={styles.inputWrapper}>
          <TextInput placeholder={'search'} />
        </View>
      </View>
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
    </>
  );
};
