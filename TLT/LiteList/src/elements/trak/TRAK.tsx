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
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TabView, TabBar} from 'react-native-tab-view';
import {colors} from '../../core';
import {CreditsContainer} from '../../containers';
import {Paragraph} from '../typography';

export const TRAKElement = ({
  TRAK,
  handleNavigateBlankDisc,
  handleSeeMoreMeta,
  item,
  handleNFTNavigation,
}: any) => {
  console.log('🚀 ~ file: TRAK.tsx ~ line 28 ~ item', item);
  const {trak, meta} = item;
  console.log('🚀 ~ file: TRAK.tsx ~ line 33 ~ trak', trak);
  console.log('🚀 ~ file: TRAK.tsx ~ line 33 ~ meta', meta);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'NOTES'},
    {key: 'second', title: 'TICKETS'},
    {key: 'third', title: 'MEDIA'},
    {key: 'fourth', title: 'MERCH'},
    {key: 'fifth', title: 'CREDITS'},
  ]);
  const layout = useWindowDimensions();

  console.log(
    '🚀 ~ file: TRAK.tsx ~ line 46 ~ meta.description.dom',
    meta.description.dom,
  );

  // for (let i = 0; i < meta.description.dom.children.length; i++) {
  //   console.log(meta.description.dom.children[i], 'pkkjkj'); // Text, DIV, Text, UL, ..., SCRIPT
  // }

  // const description = meta.description.dom.children[0];
  // console.log('🚀 ~ file: TRAK.tsx ~ line 50 ~ description', description);

  let talk = '';
  function traverseBody(node: any) {
    console.log('🚀 ~ file: TRAK.tsx ~ line 60 ~ traverseBody ~ node', node);

    // if(node.tag === 'img'){
    //   return (

    //   )
    // }

    if (node.tag === 'img') return '';

    if (node.children.length) {
      // Loop over every child node
      node.children.forEach((child: any) => {
        console.log(
          '🚀 ~ file: TRAK.tsx ~ line 68 ~ node.children.forEach ~ child',
          child,
        );
        // If it's a type 1, call the function recursively
        if (typeof child === 'string' || child instanceof String) {
          console.log(child, 'string');
          talk = talk + ' ' + child;
        } else {
          console.log(child, 'object');

          return traverseBody(child);
        }
      });
      console.log(
        '🚀 ~ file: TRAK.tsx ~ line 69 ~ node.children.forEach ~ talk',
        talk,
      );
      return talk;
    }
  }

  const description = traverseBody(meta.description.dom);
  console.log('🚀 ~ file: TRAK.tsx ~ line 84 ~ description', description);

  const handlePlay = () => {
    //
    //
  };

  if (item == null)
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
  0;
  return (
    <View style={{flex: 1, backgroundColor: '#1a1a1a'}}>
      <ParallaxScrollView
        backgroundColor="#cecece"
        contentBackgroundColor="#1a1a1a"
        parallaxHeaderHeight={350}
        stickyHeaderHeight={100}
        renderBackground={() => (
          <ImageBackground
            source={{uri: trak.thumbnail}}
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
              justifyContent: 'center',
              flex: 1,
              padding: 15,
              // backgroundColor: 'red',
              // alignItems: 'center',
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
                  source={{uri: trak.thumbnail}}
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
                  text={trak.title}
                />
                <Body
                  numberOfLines={1}
                  type="one"
                  color={'#1a1a1a'}
                  text={trak.artist}
                  textAlign="right"
                />
                <Caption
                  numberOfLines={1}
                  type="one"
                  color={'#1a1a1a'}
                  text={meta.recording_location}
                  textAlign="right"
                />
                <Caption
                  numberOfLines={1}
                  type="one"
                  color={'#1a1a1a'}
                  text={meta.release_date}
                  textAlign="right"
                />
              </View>
            </View>

            <View
              style={{
                backgroundColor: '#FFF',
                flexDirection: 'row',
                // justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                // width: '100%',
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
              }}>
              <View
                style={{
                  backgroundColor: '#1db954',
                  height: '100%',
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                  justifyContent: 'center',
                }}>
                <FontAwesome5
                  name={'gift'}
                  size={25}
                  color={'#FFF'}
                  style={{padding: 7}}
                />
              </View>
              <Pressable
                onPress={() => handleNFTNavigation(item)}
                style={{alignItems: 'flex-end', padding: 5, flex: 1}}>
                <VHeader
                  type="four"
                  color={'#1db954'}
                  text={`BUILD YOUR CRYPTO FUND INTERACTIVELY, EARNING BITCOIN PASSIVELY AGAINST '${trak.artist.toUpperCase()}'.`}
                  textAlign="right"
                />
                <Caption
                  type="two"
                  color={'#1a1a1a'}
                  text={`TEMPORARILY LOCK UP 200STX FOR 10 DAYS TO EARN FANPOINTS, BITCOIN + 10APR% AND ${trak.artist.toUpperCase()} MERCH.`}
                  textAlign="right"
                />
                <View
                  style={{
                    backgroundColor: '#1db954',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    borderRadius: 5,
                    width: '70%',
                    padding: 5,
                    paddingHorizontal: 10,
                    marginTop: 5,
                  }}>
                  <FontAwesome5
                    name={'compact-disc'}
                    size={18}
                    color={'#fff'}
                  />
                  <Body
                    numberOfLines={1}
                    type="two"
                    color={'#fff'}
                    text={'BECOME A FAN & EARN'}
                  />
                </View>
              </Pressable>
            </View>
          </View>
        )}>
        <View style={{padding: 10}}>
          <View>
            {meta.producer_artists.length !== 0 && (
              <View
                style={{
                  // borderBottomWidth: 1,
                  borderBottomColor: 'white',
                  padding: 5,
                  alignItems: 'center',
                  backgroundColor: '#fff',
                  borderRadius: 8,
                  marginBottom: 5,
                }}>
                <Body
                  numberOfLines={1}
                  type="two"
                  color={'#1A1A1A'}
                  text={'PRODUCER(S)'}
                />
              </View>
            )}
            <FlatList
              horizontal
              listKey="TRAK5"
              style={{marginTop: 5}}
              data={meta.producer_artists}
              renderItem={({item, index}) => {
                return (
                  <View
                    style={{
                      marginRight: 10,
                      // maxWidth: 400,
                      // alignItems: 'center',
                    }}>
                    <Image
                      style={{
                        height: 60,
                        width: '100%',
                        borderRadius: 10,
                      }}
                      source={{uri: item.image_url}}
                    />
                    <View
                      style={{
                        // borderBottomWidth: 1,
                        borderBottomColor: 'white',
                        padding: 3,
                        alignItems: 'center',
                        backgroundColor: '#fff',
                        borderRadius: 5,
                        marginVertical: 5,
                        paddingHorizontal: 8,
                      }}>
                      <Body
                        numberOfLines={1}
                        type="two"
                        color={'#1a1a1a'}
                        text={item.name}
                      />
                    </View>
                  </View>
                );
              }}
              keyExtractor={(item, index) => '' + index}
            />
          </View>

          <View style={{marginTop: 20}}>
            {meta.writer_artists.length !== 0 && (
              <View
                style={{
                  // borderBottomWidth: 1,
                  borderBottomColor: 'white',
                  padding: 5,
                  alignItems: 'center',
                  backgroundColor: '#fff',
                  borderRadius: 8,
                  marginBottom: 5,
                }}>
                <Body
                  numberOfLines={1}
                  type="two"
                  color={'#1a1a1a'}
                  text={'WRITER(S)'}
                />
              </View>
            )}
            <FlatList
              horizontal
              listKey="TRAK5"
              style={{marginTop: 5}}
              data={meta.writer_artists}
              renderItem={({item, index}) => {
                return (
                  <View
                    style={{
                      marginRight: 10,
                      // maxWidth: 400,
                      // alignItems: 'center',
                    }}>
                    <Image
                      style={{
                        height: 60,
                        width: '100%',
                        borderRadius: 10,
                      }}
                      source={{uri: item.image_url}}
                    />
                    <View
                      style={{
                        // borderBottomWidth: 1,
                        borderBottomColor: 'white',
                        padding: 3,
                        alignItems: 'center',
                        backgroundColor: '#fff',
                        borderRadius: 5,
                        marginVertical: 6,
                        paddingHorizontal: 8,
                      }}>
                      <Body
                        numberOfLines={1}
                        type="two"
                        color={'#1a1a1a'}
                        text={item.name}
                      />
                    </View>
                  </View>
                );
              }}
              keyExtractor={(item, index) => '' + index}
            />
          </View>
        </View>

        <View style={{borderTopWidth: 2, borderTopColor: '#fff', height: 500}}>
          <TabView
            navigationState={{index, routes}}
            style={{backgroundColor: '#1a1a1a'}}
            renderScene={({route}) => {
              switch (route.key) {
                case 'first':
                  console.log(
                    '🚀 ~ file: TRAK.tsx ~ line 421 ~ description',
                    description,
                  );
                  return (
                    <View style={{marginTop: 15, padding: 15}}>
                      <Paragraph
                        type="one"
                        color={'#fff'}
                        text={
                          description?.trim() === '?'
                            ? 'NO NOTES CURRENTLY'
                            : description!
                        }
                        textAlign="center"
                      />
                    </View>
                  );
                case 'second':
                  return (
                    <View
                      style={{
                        backgroundColor: '#1a1a1a',
                        flex: 1,
                        alignItems: 'center',
                        paddingTop: 50,
                      }}>
                      <View style={{marginBottom: 10}}>
                        <FontAwesome5 name="lock" color={'#fff'} size={100} />
                      </View>

                      <Body
                        numberOfLines={1}
                        type="two"
                        color={'#fff'}
                        text={'BECOME A FAN!'}
                      />
                    </View>
                  );
                case 'third':
                  return (
                    <View
                      style={{
                        backgroundColor: '#1a1a1a',
                        flex: 1,
                        alignItems: 'center',
                        paddingTop: 50,
                      }}>
                      <View style={{marginBottom: 10}}>
                        <FontAwesome5 name="lock" color={'#fff'} size={100} />
                      </View>
                      <Body
                        numberOfLines={1}
                        type="two"
                        color={'#fff'}
                        text={'BECOME A FAN!'}
                      />
                    </View>
                  );
                case 'fourth':
                  return (
                    <View
                      style={{
                        backgroundColor: '#1a1a1a',
                        flex: 1,
                        alignItems: 'center',
                        paddingTop: 50,
                      }}>
                      <View style={{marginBottom: 10}}>
                        <FontAwesome5 name="lock" color={'#fff'} size={100} />
                      </View>
                      <Body
                        numberOfLines={1}
                        type="two"
                        color={'#fff'}
                        text={'BECOME A FAN!'}
                      />
                    </View>
                  );
                case 'fifth':
                  return <CreditsContainer item={meta.song_relationships} />;
                default:
                  return <View style={{backgroundColor: '#1a1a1a', flex: 1}} />;
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
                    <Text
                      style={{
                        color,
                        fontSize: 13,
                        fontWeight: 'bold',
                      }}>
                      {route.title}
                    </Text>
                  );
                }}
                indicatorStyle={{backgroundColor: '#fff'}}
              />
            )}
          />
        </View>
      </ParallaxScrollView>
    </View>
  );
};
