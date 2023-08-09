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
    <ParallaxScrollView
      backgroundColor="#1a1a1a"
      contentBackgroundColor="#1a1a1a"
      parallaxHeaderHeight={110}
      stickyHeaderHeight={60}
      renderStickyHeader={() => (
        <LandingHeaderView
          query={query}
          handleChangeText={handleChangeText}
          handleClearText={handleClearText}
          isSearching={isSearching}
          {...props}
        />
      )}
      renderBackground={() => (
        <Image
          style={{
            width: '100%',
            height: 110,
          }}
          source={require('../../core/fun.png')}
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
  );
};
