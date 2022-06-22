import React from 'react';
import {
  Button,
  SafeAreaView,
  ImageBackground,
  FlatList,
  Pressable,
} from 'react-native';
// @ts-ignore
import {TrendingCard} from '../trending-card/TrendingCard';
import {View, Text, Image} from 'react-native';
import {VHeader, Body} from '../typography';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const TRAKTabElement = ({
  trak,
  handleTRAK,
  modal,
  item = null,
  ...props
}: any) => {
  console.log('🚀 ~ file: TRAKTab.tsx ~ line 14 ~ TRAKTabElement ~ trak', trak);

  const querySplit = modal ? item.split(' ') : null;
  const artist = modal ? querySplit[0] : null;
  const title = modal ? querySplit[1] : null;

  return (
    <View style={{backgroundColor: '#1a1a1a', flex: 1}}>
      {modal && (
        <View
          style={{
            marginBottom: 10,
            backgroundColor: '#cecece',
            alignSelf: 'center',
            paddingHorizontal: 15,
            paddingVertical: 5,
            borderRadius: 10,
          }}>
          <VHeader
            type="three"
            color="#1a1a1a"
            text={`Find '${title}' by ${artist}`}
            textAlign="center"
          />
        </View>
      )}
      <FlatList
        data={trak}
        style={{height: '100%'}}
        renderItem={({item, index}) => {
          console.log(
            '🚀 ~ file: TRAKTab.tsx ~ line 37 ~ TRAKTabElement ~ item',
            item,
          );
          const result = item.result;
          return (
            <Pressable onPress={() => handleTRAK(result)}>
              <View style={{flex: 3, flexDirection: 'column', margin: 10}}>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      margin: 15,
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                      maxWidth: '70%',
                    }}>
                    <VHeader
                      type="five"
                      color="white"
                      text={result.title}
                      textAlign="right"
                    />
                    <Body
                      type="two"
                      color="#cecece"
                      text={result.artist_names}
                      textAlign="right"
                    />
                  </View>
                  <Image
                    style={{
                      height: 80,
                      width: '100%',
                      borderRadius: 10,
                      backgroundColor: '#fff',
                    }}
                    source={{
                      uri: result.song_art_image_url,
                    }}
                  />
                </View>
              </View>
            </Pressable>
          );
        }}
        keyExtractor={item => item.id}
      />
    </View>
  );
};
