import {View, Text, useWindowDimensions} from 'react-native';
import React from 'react';
import {
  LandingNewReleaseView,
  LandingRecommendationsView,
  LandingTrendingView,
  LandingFeaturesView,
  LandingHeaderView,
  LandingNewsView,
  TRAKTabContainer,
  USERSTabContainer,
  // ContentSearchView,
} from '../../containers';
import {TabView, TabBar} from 'react-native-tab-view';
import {useLITELISTState} from '../../app';
import LinearGradient from 'react-native-linear-gradient';

export const DiscoverComponent = ({isSearching, query, ...props}: any) => {
  const layout = useWindowDimensions();
  const {handleGetState} = useLITELISTState();

  const authentication = handleGetState({index: 'authentication'});
  const isLoggedIn = authentication.isLoggedIn;

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'TRAK'},
    // {key: 'fifth', title: 'SHOP'},
    {key: 'second', title: 'USERS'},
    // {key: 'third', title: 'ARTIST'},
    // {key: 'fourth', title: 'TAPE'},
  ]);

  switch (isSearching) {
    case true:
      return (
        <View style={{flex: 1}}>
          {/* <Text>test</Text> */}
          <TabView
            // swipeEnabled={false}
            navigationState={{index, routes}}
            style={{backgroundColor: '#1a1a1a', height: layout.height}}
            renderScene={({route}) => {
              switch (route.key) {
                case 'first':
                  return <TRAKTabContainer query={query} {...props} />;
                case 'second':
                  return <USERSTabContainer query={query} {...props} />;
                case 'third':
                  return (
                    <View
                      style={{backgroundColor: 'transparent', flex: 1}}></View>
                  );
                case 'fourth':
                  return (
                    <View
                      style={{backgroundColor: 'transparent', flex: 1}}></View>
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
          {/* trx-00 */}
          {/* trx-33 */}
          {/* trx-66 */}
          {/* trx-99 */}
          {/* trx-122 */}
        </View>
      );
    default:
      return (
        <LinearGradient
          colors={[
            '#1A1A1A',
            '#1A1A1A',
            '#1B3926',
            '#1B3926',
            '#1A1A1A',
            '#1a1a1a',
            '#1a1a1a',
            '#1a1a1a',
            '#1B3926',
          ]}>
          {/* <LandingTrendingView /> */}
          {/* <LandingFeaturesView {...props} /> */}
          <LandingNewReleaseView navigation={props.navigation} />
          {isLoggedIn && (
            <LandingRecommendationsView navigation={props.navigation} />
          )}
          {/* <LandingNewsView /> */}
        </LinearGradient>
      );
  }
};
