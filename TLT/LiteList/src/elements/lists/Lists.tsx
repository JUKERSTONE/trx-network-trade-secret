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
  // ContentSearchView,
} from '../../containers';
import {TabView, TabBar} from 'react-native-tab-view';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

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
    {key: 'fourth', title: 'BETA'},
  ]);
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
        parallaxHeaderHeight={170}
        stickyHeaderHeight={100}
        renderBackground={() => (
          <ImageBackground
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/poster_mark_black.png?alt=media',
            }}
            style={{
              height: 170,
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
          swipeEnabled={false}
          navigationState={{index, routes}}
          style={{height: Dimensions.get('window').height * 2.5}}
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
                return (
                  <LinearGradient
                    colors={[
                      '#1B3926',
                      '#1A1A1A',
                      '#1a1a1a',
                      '#1a1a1a',
                      '#1a1a1a',
                    ]}>
                    <SafeAreaView
                      style={{
                        // flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#1a1a1a',
                        height: 400,
                      }}>
                      <Text
                        style={{
                          fontSize: 30,
                          fontWeight: 'bold',
                          color: 'whitesmoke',
                        }}>
                        COMING SOON...
                      </Text>
                    </SafeAreaView>
                  </LinearGradient>
                );
              case 'third':
                return (
                  <SafeAreaView
                    style={{
                      // flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#1a1a1a',
                      height: 400,
                    }}>
                    <Text
                      style={{
                        fontSize: 30,
                        fontWeight: 'bold',
                        color: 'whitesmoke',
                      }}>
                      COMING SOON...
                    </Text>
                  </SafeAreaView>
                );
              case 'fourth':
                return (
                  <SafeAreaView
                    style={{
                      // flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#1a1a1a',
                      height: 400,
                    }}>
                    <Text
                      style={{
                        fontSize: 30,
                        fontWeight: 'bold',
                        color: 'whitesmoke',
                      }}>
                      COMING SOON...
                    </Text>
                  </SafeAreaView>
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
                    <View
                      style={{
                        marginRight: 3,
                        backgroundColor: '#232323',
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
