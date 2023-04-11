import React from 'react';
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {VHeader, BHeader, Body, Caption} from '../../elements';
import LinearGradient from 'react-native-linear-gradient';
import {NewsCard} from '../news-card';
import {TrendingCard} from '../trending-card/TrendingCard';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface LandingNewsProps {
  news: any[];
  handleShareNews: any;
}

export const LandingNews: React.FC<LandingNewsProps> = ({
  news,
  handleShareNews,
  index,
}: any) => {
  console.log('🚀 ~ file: LandingNews.tsx ~ line 19 ~ news', news);
  const renderItem = ({item, index}: any) => {
    console.log(
      '🚀 ~ file: LandingNews.tsx ~ line 21 ~ renderItem ~ item',
      item,
    );
    return (
      <TouchableOpacity
        onPress={() => handleShareNews(item)}
        style={{width: 300}}>
        <TrendingCard
          rank={++index}
          artwork={item.thumbnail}
          title={item.title}
          artist={item.source}
          status={'falling'}
        />
      </TouchableOpacity>
    );
  };
  return (
    <LinearGradient
      colors={['#1a1a1a', '#1B3926', '#1B3926', '#1a1a1a', '#1a1a1a']}>
      <TouchableOpacity onPress={() => alert('coming soon')}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 8,
            width: '90%',
            backgroundColor: '#1db954',
            padding: 10,
            paddingVertical: 15,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            flexDirection: 'row',
          }}>
          <View
            style={{
              marginRight: 10,
              backgroundColor: '#fff',
              borderRadius: 20,
              padding: 4,
            }}>
            <MaterialIcons name="trending-up" size={20} color={'#1db954'} />
          </View>
          <VHeader type="four" color="#fff" text={'MUSIC NEWS FOR YOU.'} />
        </View>
      </TouchableOpacity>
      <FlatList
        scrollEnabled={false}
        data={news}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => '' + index}
        listKey="News"
      />
    </LinearGradient>
  );
};
