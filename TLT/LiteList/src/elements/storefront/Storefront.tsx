import React, {useEffect} from 'react';
import {
  View,
  Text,
  Button,
  SafeAreaView,
  ImageBackground,
  useWindowDimensions,
  Dimensions,
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
} from '../../containers';
import {TabView, TabBar} from 'react-native-tab-view';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import {VHeader, BHeader, Body, Paragraph, Caption} from '../typography';

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
    <View
      style={{
        height: Dimensions.get('window').height,
        backgroundColor: '#1a1a1a',
        // paddingBottom: 200,
      }}>
      <ParallaxScrollView
        backgroundColor="#1a1a1a"
        contentBackgroundColor="#1a1a1a"
        parallaxHeaderHeight={170}
        stickyHeaderHeight={100}
        renderBackground={() => (
          <ImageBackground
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/Asset%20165.png?alt=media&token=5a13fd24-834b-4213-b30f-0488618cf5f4',
            }}
            style={{
              height: 150,
              padding: 6,
              paddingBottom: 80,
              backgroundColor: '#1A1A1A',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
            // imageStyle = {{borderBottomWidth : 2, borderTopColor : 'yellow'}}
          ></ImageBackground>
        )}
        renderForeground={() =>
          index == 0 ? (
            <LandingHeaderView
              query={query}
              handleChangeText={handleChangeText}
              handleClearText={handleClearText}
              isSearching={isSearching}
              {...props}
            />
          ) : (
            <View />
          )
        }>
        <TabView
          swipeEnabled={false}
          navigationState={{index, routes}}
          style={{height: Dimensions.get('window').height * 4}}
          renderScene={({route}) => {
            switch (route.key) {
              case 'first':
                return <ShopContainer collection={recordsShop} {...props} />;
              case 'second':
                return (
                  <ShopContainer collection={merchandiseShop} {...props} />
                );
              case 'third':
                return <ShopContainer collection={ticketsShop} {...props} />;

              default:
                return <View />;
            }
          }}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
          renderTabBar={props => (
            <TabBar
              {...props}
              style={{backgroundColor: '#1a1a1a'}}
              renderLabel={({route, focused, color}) => {
                return (
                  <View style={{flexDirection: 'row'}}>
                    <View
                      style={{
                        marginRight: 3,
                        backgroundColor: focused ? '#1db954' : '#232323',
                        borderRadius: 12,
                        paddingVertical: 9,
                        paddingHorizontal: 15,
                        marginTop: 10,
                      }}>
                      <FontAwesome5
                        name={route.title}
                        size={22}
                        color={focused ? '#fff' : 'grey'}
                      />
                    </View>
                  </View>
                );
              }}
              indicatorStyle={{backgroundColor: '#1a1a1a'}}
            />
          )}
        />
      </ParallaxScrollView>
    </View>
  );
};
