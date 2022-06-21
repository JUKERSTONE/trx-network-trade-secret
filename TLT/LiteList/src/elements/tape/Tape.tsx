import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Button,
  useWindowDimensions,
  TextInput,
  FlatList,
  Pressable,
  Image,
} from 'react-native';
import {TrendingCard} from '../trending-card/TrendingCard';

import {VHeader, Body} from '..';

export const TapeElement = ({item: album, handleNavigateTRAK}: any) => {
  console.log('🚀 ~ file: Seed.tsx ~ line 22 ~ searchResult', album);
  const {width, height} = useWindowDimensions();
  const [index, setIndex] = useState(0);

  return (
    <View style={{flex: 1}}>
      <FlatList
        // horizontal
        data={album.tracks.items}
        style={{height: 200}}
        // numColumns={3}
        renderItem={({item, index}: any) => {
          console.log('🚀 ~ file: Profile.tsx ~ line 305 ~ item', item);
          return (
            <Pressable
              onPress={() =>
                handleNavigateTRAK({...item, cover_art: album.images[0].url})
              }>
              <TrendingCard
                rank={index + 1}
                artwork={album.images[0].url}
                artist={item.name}
                title={item.artists[0].name}
                status={'same'}
              />
            </Pressable>
          );
        }}
        keyExtractor={(item, index) => '' + index}
      />
    </View>
  );
};
