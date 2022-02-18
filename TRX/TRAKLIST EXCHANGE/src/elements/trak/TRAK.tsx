import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  useWindowDimensions,
  FlatList,
  Image,
  ScrollView,
  ImageBackground,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {VHeader, Body, Caption} from '..';
// @ts-ignore
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {TabView, TabBar} from 'react-native-tab-view';
import {colors} from '../../core';

export const TRAKElement = ({
  TRAK,
  handleNavigateBlankDisc,
  handleSeeMoreMeta,
}: any) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'TRAKSTAR'},
    {key: 'second', title: 'MARKET'},
    {key: 'third', title: 'WEB'},
  ]);
  const layout = useWindowDimensions();

  if (TRAK == null)
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: layout.height,
        }}>
        <ActivityIndicator color="blue" size="large" />
      </View>
    );

  return (
    <ParallaxScrollView
      backgroundColor="#cecece"
      contentBackgroundColor="#1a1a1a"
      parallaxHeaderHeight={150}
      stickyHeaderHeight={100}
      renderBackground={() => (
        <ImageBackground
          source={{uri: TRAK?.meta.thumbnail}}
          style={{
            height: 300,
            opacity: 0.4,
            padding: 6,
            paddingBottom: 80,
            backgroundColor: '#1A1A1A',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}></ImageBackground>
      )}
      renderForeground={() => (
        <View
          style={{
            backgroundColor: 'transparent',
            justifyContent: 'center',
            flex: 1,
            padding: 15,
          }}>
          <View
            style={{
              height: 80,
              backgroundColor: 'transparent',
              flexDirection: 'row',
              marginBottom: 10,
            }}>
            <View
              style={{
                justifyContent: 'flex-end',
                marginRight: 20,
                flex: 1,
              }}>
              <Image
                source={{uri: TRAK?.meta.thumbnail}}
                style={{
                  backgroundColor: '#1B4F26',
                  height: '100%',
                  width: '100%',
                  borderRadius: 10,
                }}
              />
            </View>
            <View
              style={{
                backgroundColor: 'transparent',
                justifyContent: 'center',
                alignItems: 'flex-end',
                maxWidth: '60%',
              }}>
              <VHeader
                numberOfLines={1}
                type="four"
                color={'#1a1a1a'}
                text={TRAK?.meta.title}
              />
              <Body
                numberOfLines={1}
                type="one"
                color={'#1a1a1a'}
                text={TRAK?.meta.artist}
                textAlign="right"
              />
              <Caption
                numberOfLines={1}
                type="one"
                color={'#1a1a1a'}
                text={TRAK?.meta.recording_location}
                textAlign="right"
              />
              <Caption
                numberOfLines={1}
                type="one"
                color={'#1a1a1a'}
                text={TRAK?.meta.release_date}
                textAlign="right"
              />
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View
              style={{
                backgroundColor: '#1a1a1a',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                borderRadius: 5,
                width: '50%',
                paddingHorizontal: 10,
              }}>
              <FontAwesome5
                name={'compact-disc'}
                size={18}
                color={'whitesmoke'}
              />
              <Body
                numberOfLines={1}
                type="two"
                color={'#fff'}
                text={'BECOME A FAN!'}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                borderRadius: 5,
                width: 150,
              }}>
              <Pressable
                style={{
                  backgroundColor: '#1a1a1a',
                  padding: 8,
                  borderRadius: 10,
                  marginRight: 10,
                }}>
                <Fontisto name={'spotify'} size={18} color={'whitesmoke'} />
              </Pressable>
              <Pressable
                style={{
                  backgroundColor: '#1a1a1a',
                  padding: 8,
                  borderRadius: 10,
                }}>
                <Fontisto name={'applemusic'} size={18} color={'whitesmoke'} />
              </Pressable>
            </View>
          </View>
        </View>
      )}>
      <View style={{padding: 10}}>
        <View>
          <Body
            numberOfLines={1}
            type="two"
            color={'#fff'}
            text={'PRODUCER(S)'}
          />
          <FlatList
            horizontal
            listKey="TRAK5"
            style={{marginTop: 5}}
            data={TRAK?.meta.producer_artists}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    marginRight: 10,
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{height: 60, width: 60, borderRadius: 10}}
                    source={{uri: item.image_url}}
                  />
                  <Body
                    numberOfLines={1}
                    type="two"
                    color={'#fff'}
                    text={item.name}
                  />
                </View>
              );
            }}
            keyExtractor={(item, index) => '' + index}
          />
        </View>

        <View style={{marginTop: 20}}>
          <Body
            numberOfLines={1}
            type="two"
            color={'#fff'}
            text={'WRITER(S)'}
          />
          <FlatList
            horizontal
            listKey="TRAK5"
            style={{marginTop: 5}}
            data={TRAK?.meta.writer_artists}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    marginRight: 10,
                    alignItems: 'center',
                    borderRadius: 10,
                  }}>
                  <Image
                    style={{height: 60, width: 60, borderRadius: 10}}
                    source={{uri: item.image_url}}
                  />
                  <Body
                    numberOfLines={1}
                    type="two"
                    color={'#fff'}
                    text={item.name}
                  />
                </View>
              );
            }}
            keyExtractor={(item, index) => '' + index}
          />
        </View>
      </View>

      <Pressable
        onPress={() => handleSeeMoreMeta(TRAK?.meta?.song_relationships)}>
        <View
          style={{
            backgroundColor: 'grey',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            flex: 1,
            padding: 10,
            margin: 15,
            borderRadius: 5,
            marginTop: 10,
          }}>
          <VHeader
            numberOfLines={1}
            type="four"
            color={'#fff'}
            text={'samples, remixes, covers, etc...'}
          />
        </View>
      </Pressable>

      <View>
        <TabView
          navigationState={{index, routes}}
          style={{backgroundColor: '#1d995F'}}
          renderScene={({route}) => {
            switch (route.key) {
              case 'first':
                return <View style={{backgroundColor: 'green', flex: 1}} />;
              case 'second':
                return <View style={{backgroundColor: 'blue', flex: 1}} />;
              case 'third':
                return <View style={{backgroundColor: 'red', flex: 1}} />;
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
              renderLabel={({route, focused, color}) => (
                <Text style={{color, fontSize: 15, fontWeight: 'bold'}}>
                  {route.title}
                </Text>
              )}
              indicatorStyle={{backgroundColor: '#fff'}}
            />
          )}
        />
      </View>

      {/* <FlatList
        listKey="TRAK98"
        style={{margin: 20, borderRadius: 20}}
        data={TRAK?.meta?.song_relationships}
        renderItem={({item, index}) => {
          if (item.songs.length == 0) {
            return <View />;
          }
          return (
            <View
              style={{
                marginRight: 20,
                // backgroundColor: '#1a1a1a',
                borderBottomWidth: 2,
                padding: 10,
              }}>
              <View
                style={{
                  marginBottom: 10,
                  borderBottomWidth: 1,
                  paddingBottom: 5,
                }}>
                <VHeader
                  numberOfLines={1}
                  type="four"
                  color={'#1a1a1a'}
                  text={item.relationship_type}
                  textAlign="right"
                />
              </View>

              <FlatList
                horizontal
                listKey="TRAK3"
                data={item.songs}
                renderItem={({item, index}) => {
                  return (
                    <View
                      style={{
                        maxWidth: 200,
                        margin: 5,
                        alignItems: 'center',
                        borderRadius: 10,
                        padding: 10,
                        backgroundColor: '#1A1A1A',
                      }}>
                      <Image
                        style={{height: 50, width: 50, borderRadius: 60}}
                        source={{uri: item.song_art_image_thumbnail_url}}
                      />
                      <Body
                        numberOfLines={1}
                        type="one"
                        color={'#fff'}
                        text={item.full_title}
                      />
                    </View>
                  );
                }}
                keyExtractor={(item, index) => '' + index}
              />
            </View>
          );
        }}
        keyExtractor={(item, index) => '' + index}
      /> */}
    </ParallaxScrollView>
  );
};
