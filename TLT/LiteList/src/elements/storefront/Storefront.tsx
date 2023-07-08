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
  TRAKTabContainer,
  ForYouContainer,
  OriginalsContainer,
  DiscoverContainer,
} from '../../containers';
import {TabView, TabBar} from 'react-native-tab-view';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import {VHeader, BHeader, Body, Paragraph, Caption} from '../typography';
import LottieView from 'lottie-react-native';
import {useStorefront} from '../../containers/storefront/useStorefront';

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
    {key: 'first', title: 'MUSIC'},
    {key: 'second', title: 'SHOP'},
  ]);

  const layout = useWindowDimensions();

  console.log('🚀 ~ file: Lists.tsx ~ line 22 ~ results', results);
  return (
    <>
      <TabView
        // swipeEnabled={false}
        navigationState={{index, routes}}
        style={{backgroundColor: '#1a1a1a', height: layout.height}}
        renderScene={({route}) => {
          switch (route.key) {
            case 'first':
              return <DiscoverContainer {...props} />;
            case 'second':
              return (
                <ScrollView
                  style={{
                    height: Dimensions.get('window').height,
                    backgroundColor: '#1a1a1a',
                    // paddingBottom: 200,
                  }}>
                  <CollectionsContainer
                    data={[]}
                    headerText="TRX00"
                    height={120}
                    {...props}
                  />
                  <CategoryTilesContainer {...props} />
                </ScrollView>
              );
            default:
              return <View />;
          }
        }}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={props => (
          <TabBar
            {...props}
            style={{
              backgroundColor: '#232323',
              margin: 10,
              marginHorizontal: 20,
              borderRadius: 15,
            }}
            renderLabel={({route, focused, color}) => (
              <Text
                style={{
                  color: !focused ? 'grey' : 'white',
                  fontSize: 13,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                {route.title}
              </Text>
            )}
            indicatorStyle={{backgroundColor: 'transparent'}}
          />
        )}
      />
    </>
  );
};
