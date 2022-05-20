import React from 'react';
import {View, Text, Button, SafeAreaView, ImageBackground} from 'react-native';
// @ts-ignore
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {DiscoverComponent} from '../../components';
import {
  LandingNewReleaseView,
  LandingRecommendationsView,
  LandingTrendingView,
  LandingFeaturesView,
  LandingHeaderView,
  LandingNewsView,
  // ContentSearchView,
} from '../../containers';

export const ListsElement = ({
  handleChangeText,
  isSearching,
  results,
  query,
  handleClearText,
  ...props
}: any) => {
  console.log('🚀 ~ file: Lists.tsx ~ line 22 ~ results', results);
  return (
    <View style={{backgroundColor: '#1a1a1a', flex: 1}}>
      <ParallaxScrollView
        backgroundColor="#1a1a1a"
        contentBackgroundColor="#1a1a1a"
        parallaxHeaderHeight={200}
        stickyHeaderHeight={100}
        renderBackground={() => (
          <ImageBackground
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/poster_mark_black.png?alt=media',
            }}
            style={{
              height: 200,
              padding: 6,
              paddingBottom: 80,
              backgroundColor: '#1A1A1A',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
            // imageStyle = {{borderBottomWidth : 2, borderTopColor : 'yellow'}}
          ></ImageBackground>
        )}
        renderForeground={() => (
          <LandingHeaderView
            query={query}
            handleChangeText={handleChangeText}
            handleClearText={handleClearText}
            isSearching={isSearching}
            {...props}
          />
        )}>
        <DiscoverComponent query={query} isSearching={isSearching} {...props} />
      </ParallaxScrollView>
    </View>
  );
};
