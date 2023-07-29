import React from 'react';
import {
  View,
  Text,
  Button,
  SafeAreaView,
  ImageBackground,
  useWindowDimensions,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
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
  OriginalsShowcaseContainer,
  RSSFeedComtainer,
  RSSComplexContainer,
  ShopContainer,
} from '../../containers';
import {TabView, TabBar} from 'react-native-tab-view';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import {VHeader, BHeader, Body, Paragraph, Caption} from '../typography';

export const DiscoverElement = ({
  handleChangeText,
  isSearching,
  results,
  query,
  handleClearText,
  ...props
}: any) => {
  const layout = useWindowDimensions();

  console.log('🚀 ~ file: Lists.tsx ~ line 22 ~ results', results);
  return (
    <View
      style={{
        height: Dimensions.get('window').height,
        backgroundColor: '#1a1a1a',
      }}>
      <ParallaxScrollView
        backgroundColor="#1a1a1a"
        contentBackgroundColor="#1a1a1a"
        parallaxHeaderHeight={140}
        stickyHeaderHeight={50}
        // renderStickyHeader={() => (
        //   <View
        //     style={{width: 300, height: 100, backgroundColor: 'red'}}></View>
        // )}
        renderBackground={() => (
          <Image
            style={{
              width: '100%',
              height: 100,
            }}
            source={require('../../core/poster_mark_black.png')}
          />
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
