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
  ForYouContainer,
  OriginalsContainer,
  LandingTRX01Container,
  LandingTRXCategoriesContainer,
  RSSComplexContainer,
} from '../../containers';
import {TabView, TabBar} from 'react-native-tab-view';
import {useLITELISTState} from '../../app';
import LinearGradient from 'react-native-linear-gradient';
import {LandingTRX02Container} from '../../containers';
import {ScrollView} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const DiscoverComponent = ({isSearching, query, ...props}: any) => {
  const layout = useWindowDimensions();
  const {handleGetState} = useLITELISTState();

  const authentication = handleGetState({index: 'authentication'});
  const isLoggedIn = authentication.isLoggedIn;

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'TRAK'},
    {key: 'second', title: 'FOR YOU'},
    {key: 'third', title: 'ORIGINALS'},
    // {key: 'fourth', title: 'USERS'},
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
                  return <ForYouContainer query={query} {...props} />;
                case 'third':
                  return <OriginalsContainer query={query} {...props} />;
                case 'fourth':
                // return <USERSTabContainer query={query} {...props} />;
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
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        color: !focused ? 'grey' : 'white',
                        fontSize: 13,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginRight: 5,
                      }}>
                      {route.title}
                    </Text>
                    <MaterialIcons
                      name="trending-up"
                      size={18}
                      color={'#1db954'}
                    />
                  </View>
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
        <ScrollView style={{paddingBottom: 300}}>
          <LinearGradient colors={['#1A1A1A', '#232323']}>
            {/* <LandingTRXCategoriesContainer {...props} /> */}
            <LandingNewReleaseView navigation={props.navigation} />
            <LandingTrendingView />
            {/* <LandingFeaturesView {...props} /> */}
            {isLoggedIn && (
              <LandingRecommendationsView navigation={props.navigation} />
            )}
            <LandingNewsView {...props} />
            <RSSComplexContainer {...props} />
          </LinearGradient>
        </ScrollView>
      );
  }
};
