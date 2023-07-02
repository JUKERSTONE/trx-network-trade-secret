import React, {useEffect} from 'react';
import {
  View,
  Text,
  Button,
  SafeAreaView,
  ImageBackground,
  useWindowDimensions,
  Dimensions,
  ScrollView,
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
  BasketContainer,
  CollectionsContainer,
  CategoryTilesContainer,
} from '../../containers';
import {TabView, TabBar} from 'react-native-tab-view';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import {VHeader, BHeader, Body, Paragraph, Caption} from '../typography';
import LottieView from 'lottie-react-native';

export const StorefrontElement = ({
  handleChangeText,
  isSearching,
  results,
  query,
  handleClearText,
  recordsShop,
  ticketsShop,
  merchandiseShop,
  route,
  ...props
}: any) => {
  console.log('🚀 ~ file: Storefront.tsx:46 ~ route:', route);
  console.log(
    '🚀 ~ file: Storefront.tsx:44 ~ merchandiseShop:',
    merchandiseShop,
  );
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'record-vinyl'},
    {key: 'second', title: 'tshirt'},
    {key: 'third', title: 'ticket-alt'},
  ]);
  const layout = useWindowDimensions();

  // useEffect(() => {
  //   if (route?.params?.isNavigateToBasket) setIndex(3);
  // }, [route]);

  console.log('🚀 ~ file: Lists.tsx ~ line 22 ~ results', results);
  return (
    <ScrollView
      style={{
        height: Dimensions.get('window').height,
        backgroundColor: '#1a1a1a',
        // paddingBottom: 200,
      }}>
      <CollectionsContainer {...props} />
      <CategoryTilesContainer {...props} />
    </ScrollView>
  );
};
