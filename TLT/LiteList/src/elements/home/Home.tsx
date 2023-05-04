import React from 'react';
import {View, Image, Button, useWindowDimensions, Text} from 'react-native';
// @ts-ignore
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import {VHeader, BHeader, Body, Caption} from '..';
import {TabView, TabBar} from 'react-native-tab-view';
import {SwipeContainer} from '../../containers';
import LottieView from 'lottie-react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const HomeElement = ({...props}) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'swipe'},
    {key: 'second', title: 'forum'},
  ]);
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
            return (
              <View style={{flex: 1}}>
                <LottieView
                  source={require('../../core/57276-astronaut-and-music.json')}
                  autoPlay
                  loop
                />
                <View
                  style={{
                    position: 'absolute',
                    top: 20,
                    alignSelf: 'center',
                  }}>
                  <VHeader
                    numberOfLines={1}
                    type="four"
                    color={'#fff'}
                    text={'COMING SOON...'}
                    textAlign="center"
                  />
                </View>
              </View>
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
