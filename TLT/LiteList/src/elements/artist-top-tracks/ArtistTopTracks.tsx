import React, {FC} from 'react';
import {View, Pressable, FlatList} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {VHeader, BHeader, Body, Caption} from '../typography';
import {TrendingCard} from '../trending-card/TrendingCard';

interface IAristTopTracks {
  topTracks: any;
  colors: any;
}

export const ArtistTopTracks: FC<IAristTopTracks> = ({topTracks, colors}) => {
  console.log(
    '🚀 ~ file: ArtistTopTracks.tsx ~ line 14 ~ topTracks',
    topTracks,
  );
  return (
    <View style={{marginBottom: 10}}>
      <View
        style={{
          alignItems: 'flex-end',
          justifyContent: 'center',
          marginRight: 15,
          marginBottom: 5,
        }}>
        <Caption
          type="one"
          color={colors ? colors.background : '#fff'}
          text={'TOP TRACKS.'}
        />
      </View>
      {/*  */}
      <FlatList
        listKey="Trending"
        data={topTracks}
        renderItem={({index, item}) => {
          return (
            <TrendingCard
              rank={++index}
              artwork={item.album.images[0].url}
              title={item.name}
              artist={item.artists[0].name}
              isDynamic
              colors={colors ? colors : '#fff'}
              status={'rising'}
            />
          );
        }}
        keyExtractor={(item, index) => '' + index}
      />
      {/*  */}
      <Pressable onPress={() => alert('coming soon')}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 8,
            width: '50%',
          }}>
          <VHeader
            type="six"
            color={colors ? colors.detail : '#fff'}
            text={'SEE MORE'}
          />
        </View>
      </Pressable>
    </View>
  );
};
