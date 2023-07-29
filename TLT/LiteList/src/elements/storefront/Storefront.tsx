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
  Image,
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
import Entypo from 'react-native-vector-icons/Entypo';
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
    {key: 'first', title: 'M3DIA', icon: 'video'},
    {key: 'second', title: 'SHOP', icon: 'shopping-cart'},
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
                  <Image
                    style={{
                      width: '100%',
                      height: 100,
                    }}
                    source={require('../../core/poster_mark_green.png')}
                  />
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
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}>
                {route.icon == 'video' ? (
                  <Entypo
                    name={route.icon}
                    size={18}
                    color={'#fff'}
                    style={{paddingTop: 1, paddingRight: 2}}
                  />
                ) : (
                  <FontAwesome5
                    name={route.icon}
                    size={16}
                    color={'#fff'}
                    style={{paddingTop: 1, paddingRight: 2}}
                  />
                )}
                <Text
                  style={{
                    color: !focused ? 'grey' : 'white',
                    fontSize: 13,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginLeft: 7,
                  }}>
                  {route.title}
                </Text>
              </View>
            )}
            indicatorStyle={{backgroundColor: 'transparent'}}
          />
        )}
      />
    </>
  );
};
