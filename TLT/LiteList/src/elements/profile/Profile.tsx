import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  ScrollView,
  ImageBackground,
  Image,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect} from 'react';
import {VHeader, Body} from '../typography';
import {useLITELISTState} from '../../app';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import MarqueeText from 'react-native-marquee';
import {TrendingCard} from '../trending-card/TrendingCard';
import {TabView, TabBar} from 'react-native-tab-view';
import {colors} from '../../core';

export const ProfileElement = ({
  item,
  isOwner,
  streaming,
  handleToggleProfileVisibility,
  handleToggleFollowUser,
  profile,
  favorites,
  playlists,
}: any) => {
  console.log('🚀 ~ file: Profile.tsx ~ line 31 ~ item', item);
  console.log(
    '🚀 ~ file: Profile.tsx ~ line 15 ~ ProfileElement ~ streaming',
    streaming,
    profile,
    favorites,
  );

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'PLAYLISTS'},
    {key: 'second', title: 'TOP TRACKS'},
    {key: 'third', title: 'TOP ARTISTS'},
  ]);
  const layout = useWindowDimensions();

  const isPrivate = useSelector((state: any) => state.profile.TRX.isPrivate);

  if (!profile) {
    return <View />;
  }
  return (
    // <ScrollView style={{backgroundColor: '#1a1a1a'}}>
    <View style={{flex: 1}}>
      <View style={{alignItems: 'center', backgroundColor: '#1a1a1a'}}>
        <View
          style={{
            // padding: 5,
            // width: '100%',
            borderRadius: 15,
            borderBottomLeftRadius: 25,
            flexDirection: 'row',
            backgroundColor: '#333333',
            margin: 8,
            borderWidth: 3,
            borderColor: '#232323',
            // borderBottomWidth: 1,
            // borderBottomColor: '#fff',
          }}>
          <Image
            source={{uri: item.avatarURL}}
            style={{
              backgroundColor: '#1B4F26',
              height: 130,
              width: 130,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 100,
              borderTopRightRadius: 30,
              borderTopLeftRadius: 15,
              marginRight: 10,
              // borderRadius: 15,
            }}
          />
          <View
            style={{
              paddingVertical: 15,
              justifyContent: 'space-around',
              flex: 1,
            }}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  marginRight: 15,
                  // backgroundColor: 'white',
                  justifyContent: 'center',
                  borderRadius: 10,
                  padding: 3,
                }}>
                <MaterialIcons
                  name="alternate-email"
                  size={20}
                  color={'#fff'}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <VHeader
                  numberOfLines={1}
                  type="five"
                  color={'#fff'}
                  text={item.trak_name}
                />
                <Body
                  numberOfLines={1}
                  type="one"
                  color={'#fff'}
                  text={'  [' + item.trak_symbol + ']'}
                />
                <View style={{flexDirection: 'row', marginLeft: 3}}>
                  <Ionicons name="ios-flame-sharp" size={20} color={'orange'} />
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: 'bold',
                      color: '#cecece',
                    }}>
                    {item.streak}
                  </Text>
                </View>
              </View>
            </View>

            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  marginRight: 15,
                  // backgroundColor: 'white',
                  justifyContent: 'center',
                  borderRadius: 10,
                  padding: 3,
                }}>
                <MaterialCommunityIcons
                  name="format-quote-close"
                  size={20}
                  color={'#fff'}
                />
              </View>
              <View style={{justifyContent: 'center'}}>
                <Body
                  // numberOfLines={1}
                  type="two"
                  color={'#fff'}
                  text={'"' + item.quotable + '"'}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  marginRight: 15,
                  // backgroundColor: 'white',
                  justifyContent: 'center',
                  borderRadius: 10,
                  padding: 3,
                }}>
                <MaterialIcons
                  name={
                    !isOwner
                      ? 'follow-the-signs'
                      : isPrivate
                      ? 'public'
                      : 'public-off'
                  }
                  size={20}
                  color={'#fff'}
                />
              </View>
              <View>
                {!isOwner ? (
                  <Pressable onPress={handleToggleFollowUser}>
                    <View
                      style={{
                        backgroundColor: 'green',
                        alignSelf: 'flex-start',
                        paddingHorizontal: 10,
                        paddingVertical: 3,
                        borderRadius: 3,
                        marginTop: 5,
                      }}>
                      <VHeader
                        // numberOfLines={1}
                        type="five"
                        color={'#fff'}
                        text={'FOLLOW'}
                      />
                    </View>
                  </Pressable>
                ) : (
                  <Pressable onPress={handleToggleProfileVisibility}>
                    <View
                      style={{
                        backgroundColor: '#1a1a1a',
                        borderWidth: 3,
                        borderColor: '#232323',
                        alignSelf: 'flex-start',
                        paddingHorizontal: 10,
                        paddingVertical: 3,
                        borderRadius: 3,
                        marginTop: 5,
                      }}>
                      <VHeader
                        // numberOfLines={1}
                        type="six"
                        color={'#fff'}
                        text={isPrivate ? 'GO PUBLIC' : 'GO PRIVATE'}
                      />
                    </View>
                  </Pressable>
                )}
              </View>
            </View>
          </View>
        </View>
      </View>

      <TabView
        navigationState={{index, routes}}
        style={{
          backgroundColor: '#1a1a1a',
          borderTopRightRadius: 25,
          // borderTopLeftRadius: 30,
          marginRight: 7,
        }}
        renderScene={({route}) => {
          switch (route.key) {
            case 'first':
              return (
                <FlatList
                  // horizontal
                  data={isOwner ? playlists : JSON.parse(item.playlists)}
                  style={{height: 200}}
                  // numColumns={3}
                  renderItem={({item, index}: any) => {
                    console.log(
                      '🚀 ~ file: Profile.tsx ~ line 251 ~ item',
                      item,
                    );
                    const type = item.info;
                    switch (type) {
                      case 'playlists:spotify':
                        return (
                          <TrendingCard
                            rank={index + 1}
                            artwork={item.images[0]?.url}
                            title={item.name}
                            artist={''}
                            status={'same'}
                          />
                        );
                      case 'playlists:apple_music':
                        console.log(item, 'vrewhe');
                        return (
                          <TrendingCard
                            rank={index + 1}
                            artwork={item.attributes.artwork.url}
                            title={item.attributes.name}
                            artist={''}
                            status={'same'}
                          />
                        );
                      default:
                        return (
                          <View
                            style={{
                              backgroundColor: '#ff7700',
                              margin: 10,
                              width: 150,
                              borderRadius: 10,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            {/* <Text>fe</Text> */}
                          </View>
                        );
                    }
                  }}
                  keyExtractor={(item, index) => '' + index}
                />
              );
            case 'second':
              return (
                <FlatList
                  // horizontal
                  data={isOwner ? favorites : JSON.parse(item.favorites)}
                  style={{height: 200}}
                  // numColumns={3}
                  renderItem={({item, index}: any) => {
                    console.log(
                      '🚀 ~ file: Profile.tsx ~ line 251 ~ item',
                      item,
                    );
                    const type = item.info;
                    switch (type) {
                      case 'topTracks':
                        return (
                          <TrendingCard
                            rank={index + 1}
                            artwork={item.album.images[0]?.url}
                            title={item.name}
                            artist={item.artists[0].name}
                            status={'same'}
                          />
                        );

                      default:
                        return (
                          <View
                            style={{
                              backgroundColor: '#ff7700',
                              margin: 10,
                              width: 150,
                              borderRadius: 10,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            {/* <Text>fe</Text> */}
                          </View>
                        );
                    }
                  }}
                  keyExtractor={(item, index) => '' + index}
                />
              );
            case 'third':
              return (
                <FlatList
                  // horizontal
                  data={isOwner ? favorites : JSON.parse(item.favorites)}
                  // style={{height: 200}}
                  // numColumns={3}
                  renderItem={({item, index}: any) => {
                    console.log(
                      '🚀 ~ file: Profile.tsx ~ line 251 ~ item',
                      item,
                    );
                    const type = item.info;
                    switch (type) {
                      case 'topArtists':
                        return (
                          <TrendingCard
                            artwork={item.images[0]?.url}
                            title={''}
                            artist={item.name}
                          />
                        );

                      default:
                        return (
                          <View
                            style={{
                              backgroundColor: '#1a1a1a',
                              // margin: 10,
                              // width: 150,
                              height: 1,
                              borderRadius: 10,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            {/* <Text>fe</Text> */}
                          </View>
                        );
                    }
                  }}
                  keyExtractor={(item, index) => '' + index}
                />
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
            renderLabel={({route, focused, color}) => (
              <Text
                style={{
                  color: !focused ? '#fff' : colors.light.primary,
                  fontSize: 15,
                  fontWeight: 'bold',
                }}>
                {route.title}
              </Text>
            )}
            indicatorStyle={{backgroundColor: colors.light.primary}}
          />
        )}
      />

      {/* <View style={{width: '100%'}}>
          <View style={{marginRight: 15, marginTop: 20, alignSelf: 'flex-end'}}>
            <VHeader
              numberOfLines={1}
              type="four"
              color={'#fff'}
              text={'ACTIVITY'}
            />
          </View>
          <FlatList
            data={[0, 0, 0, 0, 0, 0, 0, 0]}
            style={{backgroundColor: '#1a1a1a', width: '100%'}}
            renderItem={({item, index}: any) => {
              return (
                <View
                  style={{
                    backgroundColor: 'grey',
                    flex: 1,
                    margin: 10,
                    height: 150,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text>fe</Text>
                </View>
              );
            }}
            keyExtractor={(item, index) => '' + index}
          />
        </View> */}
      {/* </ScrollView> */}
    </View>
  );
};
