import React from 'react';
import {View, Image, FlatList, Pressable} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {VHeader, Body, BHeader, Paragraph, Caption} from '../typography';
import {TrendingCard} from '../trending-card/TrendingCard';

interface TLandingTrending {
  data: any;
}

export const LandingTrending: React.FC<TLandingTrending> = ({data}) => {
  return (
    <View style={{marginVertical: 10}}>
      <View
        style={{
          alignItems: 'flex-end',
          justifyContent: 'center',
          marginRight: 15,
          marginBottom: 5,
        }}>
        <Caption type="one" color="yellow" text={'TRENDING ON TRAKLIST.'} />
      </View>
      {/*  */}
      <FlatList
        listKey="Trending"
        data={data}
        renderItem={({item}) => {
          return (
            <TrendingCard
              rank={item.rank}
              artwork={item.artwork}
              title={item.title}
              artist={item.artist}
              status={item.status}
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
          <VHeader type="six" color="#1db954" text={'SEE MORE'} />
        </View>
      </Pressable>
    </View>
  );
};
