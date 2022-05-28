import React from 'react';
import {
  View,
  Text,
  Button,
  SafeAreaView,
  ImageBackground,
  useWindowDimensions,
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
  // ContentSearchView,
} from '../../containers';
import {TabView, TabBar} from 'react-native-tab-view';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
    {key: 'four', title: 'BETA'},
  ]);
  const layout = useWindowDimensions();

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
        <TabView
          navigationState={{index, routes}}
          style={{height: layout.height}}
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
              // case 'second':
              //   return <ProductView products={NFT?.nft.trakPRODUCTS} />;
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
                    name = 'home';
                    break;
                  case 'CHARTS':
                    name = 'stacked-line-chart';
                    break;
                  case 'FEED':
                    name = 'rss-feed';
                    break;

                  case 'BETA':
                    name = 'perm-device-information';
                    break;
                  default:
                    name = 'home';
                    break;
                }
                return (
                  <View style={{flexDirection: 'row'}}>
                    <View style={{marginRight: 3}}>
                      <MaterialIcons
                        name={name}
                        size={18}
                        color={focused ? '#fff' : 'grey'}
                      />
                    </View>
                    <Text
                      style={{
                        color: focused ? '#fff' : 'grey',
                        fontSize: 15,
                        fontWeight: 'bold',
                      }}>
                      {route.title}
                    </Text>
                  </View>
                );
              }}
              indicatorStyle={{backgroundColor: '#fff'}}
            />
          )}
        />
      </ParallaxScrollView>
    </View>
  );
};
