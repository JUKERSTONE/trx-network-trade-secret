import React from 'react';
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
} from '../../containers';
import {TabView, TabBar} from 'react-native-tab-view';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import {VHeader, BHeader, Body, Paragraph, Caption} from '../typography';

export const ListsElement = ({
  handleChangeText,
  isSearching,
  results,
  query,
  handleClearText,
  ...props
}: any) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'HOME'},
    {key: 'second', title: 'CHARTS'},
    {key: 'third', title: 'FEED'},
    {key: 'fourth', title: 'SHOP'},
  ]);
  const layout = useWindowDimensions();

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
                return (
                  <DiscoverComponent
                    query={query}
                    isSearching={isSearching}
                    {...props}
                  />
                );
              case 'second':
                return <OriginalsShowcaseContainer />;
              case 'third':
                return <RSSComplexContainer {...props} />;
              case 'fourth':
                return <ShopContainer {...props} />;
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
                let name;

                switch (route.title) {
                  case 'HOME':
                    name = 'youtube-searched-for';
                    break;
                  case 'CHARTS':
                    name = 'ghost';
                    break;
                  case 'FEED':
                    name = 'rss-feed';
                    break;

                  case 'SHOP':
                    name = 'shop';
                    break;
                  default:
                    name = 'home';
                    break;
                }

                if (route.title === 'CHARTS')
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
                          name={name}
                          size={22}
                          color={focused ? '#fff' : 'grey'}
                        />
                      </View>
                    </View>
                  );
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
                      <MaterialIcons
                        name={name}
                        size={22}
                        color={focused ? '#fff' : 'grey'}
                      />
                    </View>
                    {/* <Text
                      style={{
                        color: focused ? '#fff' : 'grey',
                        fontSize: 15,
                        fontWeight: 'bold',
                      }}>
                      {route.title}
                    </Text> */}
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
