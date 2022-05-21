import React from 'react';
import {
  View,
  Image,
  FlatList,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {VHeader, BHeader, Body, Caption} from '../../elements';
import LinearGradient from 'react-native-linear-gradient';
import {NewsCard} from '../news-card';
import {TrendingCard} from '../trending-card/TrendingCard';

interface LandingNewsProps {
  news: any[];
}

export const LandingNews: React.FC<LandingNewsProps> = ({news, index}: any) => {
  console.log('🚀 ~ file: LandingNews.tsx ~ line 19 ~ news', news);
  const renderItem = ({item, index}: any) => {
    console.log(
      '🚀 ~ file: LandingNews.tsx ~ line 21 ~ renderItem ~ item',
      item,
    );
    return (
      <Pressable onPress={() => alert('share')} style={{width: 300}}>
        <TrendingCard
          rank={++index}
          artwork={item.image}
          title={item.header}
          artist={item.subHeader}
          // status={trending?.one?.status}
        />
      </Pressable>
    );
  };
  return (
    <LinearGradient colors={['#1B3926', '#1a1a1a', '#1a1a1a']}>
      <View>
        <View
          style={{
            marginRight: 20,
            marginTop: 5,
            alignItems: 'flex-end',
            alignSelf: 'flex-end',
            padding: 5,
            borderRadius: 3,
            opacity: 0.9,
          }}>
          <Caption type="one" color="white" text={'MUSIC NEWS FOR YOU...'} />
        </View>
        <FlatList
          data={news}
          renderItem={renderItem}
          // horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => '' + index}
          listKey="News"
        />
      </View>
    </LinearGradient>
  );
};
