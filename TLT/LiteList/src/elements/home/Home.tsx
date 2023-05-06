import React, {useEffect} from 'react';
import {View, Image, Button, useWindowDimensions, Text} from 'react-native';
// @ts-ignore
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import {VHeader, BHeader, Body, Caption} from '..';
import {TabView, TabBar} from 'react-native-tab-view';
import {SwipeContainer, FeedContainer} from '../../containers';
import LottieView from 'lottie-react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {store, setFeed, setChatPlayer, setSwipePlayer} from '../../stores';

export const HomeElement = ({...props}) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'swipe'},
    {key: 'second', title: 'forum'},
  ]);

  useEffect(() => {
    if (index === 1) {
      const action = setFeed(true);
      store.dispatch(action);
      const action1 = setChatPlayer({});
      store.dispatch(action1);
    } else {
      const action = setFeed(false);
      store.dispatch(action);
      const action1 = setSwipePlayer({});
      store.dispatch(action1);
    }
  }, [index]);
  return (
    <TabView
      sceneContainerStyle={{overflow: 'visible'}}
      swipeEnabled={false}
      navigationState={{index, routes}}
      style={{backgroundColor: '#1a1a1a', height: layout.height}}
      renderScene={({route}) => {
        switch (route.key) {
          case 'first':
            return <SwipeContainer {...props} />;
          case 'second':
            return <FeedContainer {...props} />;
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
            borderRadius: 10,
          }}
          renderLabel={({route, focused, color}) => (
            <MaterialIcons
              name={route.title}
              color={focused ? '#fff' : 'grey'}
              size={20}
            />
          )}
          indicatorStyle={{backgroundColor: '#1db954'}}
        />
      )}
    />
  );
};
