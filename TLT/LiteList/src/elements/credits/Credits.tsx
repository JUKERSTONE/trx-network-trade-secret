import React from 'react';
import {Button, SafeAreaView, ImageBackground, FlatList} from 'react-native';
// @ts-ignore
import {TrendingCard} from '../trending-card/TrendingCard';
import {View, Text, Image} from 'react-native';
import {VHeader, Body} from '../typography';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const CreditsElement = ({item, ...props}: any) => {
  console.log('🚀 ~ file: Credits.tsx ~ line 10 ~ CreditsElement ~ item', item);

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <FlatList
        listKey="TRAK98"
        style={{backgroundColor: '#1a1a1a'}}
        data={item}
        renderItem={({item, index}) => {
          console.log(
            '🚀 ~ file: Credits.tsx ~ line 18 ~ CreditsElement ~ item',
            item,
          );
          if (item.songs.length == 0) {
            return <View />;
          }
          return (
            <View
              style={{
                // borderBottomWidth: 2,
                padding: 10,
              }}>
              <View
                style={{
                  // borderBottomWidth: 1,
                  borderBottomColor: 'white',
                  padding: 5,
                  alignItems: 'center',
                  backgroundColor: '#fff',
                  borderRadius: 8,
                }}>
                <Body
                  numberOfLines={1}
                  type="one"
                  color={'#1a1a1a'}
                  text={item.relationship_type}
                />
              </View>

              <FlatList
                listKey="TRAK3"
                data={item.songs}
                renderItem={({item, index}) => {
                  return (
                    <View
                      style={{
                        paddingBottom: 10,
                        alignItems: 'center',
                      }}>
                      <Image
                        style={{
                          height: 60,
                          width: 60,
                          borderRadius: 10,
                          margin: 10,
                        }}
                        source={{uri: item.song_art_image_thumbnail_url}}
                      />
                      <Body type="two" color={'#fff'} text={item.full_title} />
                    </View>
                  );
                }}
                keyExtractor={(item, index) => '' + index}
              />
            </View>
          );
        }}
        keyExtractor={(item, index) => '' + index}
      />
    </View>
  );
};
