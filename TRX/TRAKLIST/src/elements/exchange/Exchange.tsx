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
import {VHeader, Body, Caption} from '../typography';
import {colors} from '../../core';

export const ExchangeElement = ({bank, handleExchange, title, artist}: any) => {
  console.log('🚀 ~ file: Exchange.tsx ~ line 22 ~ title', title);
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
          <Text style={styles.title}>SEARCH EXCHANGE</Text>
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={{
              color: colors.light.primary,
              fontWeight: 'bold',
              fontSize: 13,
            }}
            placeholder={'search'}
          />
        </View>
      </View>
      <FlatList
        data={bank}
        // style={{height: '84%'}}
        renderItem={({item}) => {
          // console.log('🚀 ~ file: Seed.tsx ~ line 110 ~ item', item);

          const isNFT = item.isNFT;
          let title, artist, thumbnail;
          switch (isNFT) {
            case true:
              title = item.nft.trakTITLE;
              artist = item.nft.trakARTIST;
              thumbnail = item.nft.trakIMAGE;
              break;
            case false:
              title = item.title;
              artist = item.artist;
              thumbnail = item.thumbnail;
              break;
          }

          return (
            <Pressable onPress={() => handleExchange({item})}>
              <View
                style={{
                  padding: 10,
                  marginHorizontal: 5,
                  borderBottomWidth: 1,
                  borderBottomColor: '#cecece',
                }}>
                <View
                  style={{
                    height: 80,
                    flexDirection: 'row',
                    borderRadius: 5,
                  }}>
                  <View
                    style={{
                      justifyContent: 'flex-end',
                      marginRight: 20,
                      flex: 1,
                    }}>
                    <Image
                      source={{uri: thumbnail}}
                      style={{
                        backgroundColor: '#1B4F26',
                        height: '100%',
                        width: '100%',
                        borderRadius: 5,
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
                      text={title}
                    />
                    <Body
                      numberOfLines={1}
                      type="one"
                      color={'#fff'}
                      text={artist}
                      textAlign="right"
                    />
                    <View
                      style={{
                        backgroundColor: isNFT ? '#fff' : '#1a1a1a',
                        paddingVertical: 3,
                        paddingHorizontal: 8,
                        borderRadius: 3,
                      }}>
                      <Caption
                        numberOfLines={1}
                        type="one"
                        color={isNFT ? 'green' : '#fff'}
                        text={isNFT ? 'NFT' : 'TRX'}
                        textAlign="right"
                      />
                    </View>
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
