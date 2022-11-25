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
  RefreshControl,
  Button,
  ActivityIndicator,
  TouchableOpacity,
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
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useAppBrowser} from '../../containers';

export const ProfileElement = ({
  item,
  isOwner,
  streaming,
  handleToggleProfileVisibility,
  handleToggleFollowUser,
  profile,
  favorites,
  playlists,
  handleNFTNavigation,
  handleNextTransaction,
  refreshing,
  handleRefresh,
  handleArtistNavigation,
  loadingArtist,
  handleTRAK,
  handlePlaylistNavigation,
  handleSendCrypto,
  TRXProfile,
  transactions,
  handleClipboard,
  handleNavigateSwipe,
  handleCatalogTRAK,
  list,
}: any) => {
  console.log('🚀 ~ file: Profile.tsx ~ line 51 ~ transactions', transactions);
  console.log('🚀 ~ file: Profile.tsx ~ line 48 ~ TRXProfile', TRXProfile);
  console.log('🚀 ~ file: Profile.tsx ~ line 31 ~ item', item);
  console.log(
    '🚀 ~ file: Profile.tsx ~ line 15 ~ ProfileElement ~ streaming',
    streaming,
    profile,
    favorites,
  );

  const profileObj = isOwner ? TRXProfile : item;
  console.log('🚀 ~ file: Profile.tsx ~ line 58 ~ profileObj', profileObj);

  const {handleLoadHTTPS} = useAppBrowser();

  const [index, setIndex] = React.useState(0);
  const [index1, setIndex1] = React.useState(0);
  const [index2, setIndex2] = React.useState(0);
  const [routes] = React.useState([
    {key: 'second', title: 'TOP TRACKS'},
    {key: 'fourth', title: 'TOP ARTISTS'},
    {key: 'third', title: 'PLAYLISTS'},
  ]);
  const [routes1] = React.useState([
    {key: 'first', title: 'CRYPTO'},
    {key: 'fourth', title: 'EARN'},
    {key: 'second', title: 'ACTIVITY'},
    {key: 'third', title: 'NFTs'},
  ]);
  const [routes2] = React.useState([
    {key: 'third', title: 'CATALOG'},
    {key: 'first', title: 'PROFILE'},
    {key: 'second', title: 'WALLET'},
  ]);
  const layout = useWindowDimensions();

  const isPrivate = useSelector((state: any) => state.profile.TRX.isPrivate);
  const profileTRX = useSelector((state: any) => state.profile.TRX);
  const {wallet} = useSelector((state: any) => state.crypto);
  console.log('🚀 ~ file: Profile.tsx ~ line 97 ~ wallet', wallet);
  console.log('🚀 ~ file: Profile.tsx ~ line 96 ~ profileTRX', profileTRX);

  useEffect(() => {
    handleLoadHTTPS({
      route: 'https://tsb.media/wallet/reproduce',
      params: JSON.stringify(profileTRX.tuc_public_keys),
    });
  }, []);

  if (!profile) {
    return <View />;
  }
  return (
    <View style={{flex: 1}}>
      <LinearGradient
        colors={[
          '#1B3926',
          '#1B3926',
          '#1A1A1A',
          '#1a1a1a',
          '#1a1a1a',
          '#1a1a1a',
          '#1B3926',
        ]}
        style={{flex: 1}}>
        <View
          style={{
            // alignItems: 'center',
            // backgroundColor: '#1B3926',
            flex: 2,
            // marginBottom: 6,
          }}>
          <TabView
            // style={{backgroundColor: '#1B3926'}}
            navigationState={{index: index2, routes: routes2}}
            renderScene={({route}) => {
              switch (route.key) {
                case 'first':
                  console.log(
                    '🚀 ~ file: Profile.tsx ~ line 357 ~ profile.wallet',
                    profile.wallet,
                  );
                  return (
                    <View style={{flex: 1}}>
                      <View
                        style={{
                          // padding: 5,
                          // width: '100%',
                          flexDirection: 'row',
                          backgroundColor: '#1a1a1a',
                          margin: 8,
                          borderRadius: 18,
                          // borderWidth: 3,
                          borderColor: 'grey',
                          // borderBottomWidth: 1,
                          // borderBottomColor: '#fff',
                          height: 200,
                          // flex: 1,
                        }}>
                        <Image
                          source={{uri: profileObj.avatarURL}}
                          style={{
                            backgroundColor: '#1B4F26',
                            height: 130,
                            width: 130,
                            alignSelf: 'center',
                            marginHorizontal: 10,
                            borderRadius: 60,
                            borderWidth: 4,
                            borderColor: '#333333',
                          }}
                        />
                        <View
                          style={{
                            paddingVertical: 15,
                            justifyContent: 'center',
                            flex: 1,
                            paddingTop: 30,
                            marginLeft: 15,
                          }}>
                          <View style={{flexDirection: 'row'}}>
                            <View
                              style={{
                                marginRight: 15,
                                backgroundColor: '#1a1a1a',
                                justifyContent: 'center',
                                borderRadius: 7,
                                padding: 6,
                              }}>
                              <MaterialIcons
                                name="alternate-email"
                                size={17}
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
                                color={'#cecece'}
                                text={profileObj.trak_name}
                              />
                              <Body
                                numberOfLines={1}
                                type="one"
                                color={'#663355'}
                                text={'  [' + profileObj.trak_symbol + ']'}
                              />
                              <View
                                style={{flexDirection: 'row', marginLeft: 3}}>
                                <Ionicons
                                  name="ios-flame-sharp"
                                  size={20}
                                  color={'orange'}
                                />
                                <Text
                                  style={{
                                    fontSize: 11,
                                    fontWeight: 'bold',
                                    color: '#cecece',
                                  }}>
                                  {profileObj.streak}
                                </Text>
                              </View>
                            </View>
                          </View>

                          <View style={{flexDirection: 'row', marginTop: 10}}>
                            <View
                              style={{
                                marginRight: 15,
                                backgroundColor: '#1a1a1a',
                                justifyContent: 'center',
                                borderRadius: 7,
                                padding: 6,
                              }}>
                              <MaterialCommunityIcons
                                name="format-quote-close"
                                size={17}
                                color={'#fff'}
                              />
                            </View>
                            <View style={{justifyContent: 'center'}}>
                              <Body
                                // numberOfLines={1}
                                type="two"
                                color={'#cecece'}
                                text={'"' + profileObj.quotable + '"'}
                              />
                            </View>
                          </View>
                          <View style={{flexDirection: 'row', marginTop: 10}}>
                            <View
                              style={{
                                marginRight: 15,
                                backgroundColor: '#1a1a1a',
                                justifyContent: 'center',
                                borderRadius: 7,
                                padding: 6,
                              }}>
                              <MaterialIcons
                                name="category"
                                size={17}
                                color={'#fff'}
                              />
                            </View>
                            <View style={{justifyContent: 'center'}}>
                              {/* <Body
                        // numberOfLines={1}
                        type="two"
                        color={'#1a1a1a'}
                        text={item.userCategory + ' user'}
                      /> */}
                              {profileObj.userCategory === 'spotify' && (
                                <Fontisto
                                  name="spotify"
                                  size={18}
                                  color={'#cecece'}
                                />
                              )}
                              {profileObj.userCategory === 'primary' && (
                                <View style={{flexDirection: 'row'}}>
                                  <View style={{marginRight: 5}}>
                                    <Fontisto
                                      name="spotify"
                                      size={18}
                                      color={'#cecece'}
                                    />
                                  </View>
                                  <Fontisto
                                    name="applemusic"
                                    size={18}
                                    color={'#cecece'}
                                  />
                                </View>
                              )}
                              {profileObj.userCategory === 'apple_music' && (
                                <Fontisto
                                  name="applemusic"
                                  size={18}
                                  color={'#cecece'}
                                />
                              )}
                            </View>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              marginTop: 2,
                              paddingRight: 10,
                              width: '100%',
                              // backgroundColor: 'red',
                              justifyContent: 'flex-end',
                            }}>
                            {!isOwner ? (
                              <Pressable onPress={handleToggleFollowUser}>
                                <View
                                  style={{
                                    backgroundColor: '#232323',
                                    // borderWidth: 3,
                                    borderColor: 'grey',
                                    alignSelf: 'flex-start',
                                    paddingHorizontal: 10,
                                    paddingVertical: 3,
                                    borderRadius: 5,
                                    marginTop: 10,
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
                              <Pressable
                                onPress={handleToggleProfileVisibility}>
                                <View
                                  style={{
                                    backgroundColor: '#232323',
                                    // borderWidth: 3,
                                    borderColor: 'grey',
                                    alignSelf: 'flex-start',
                                    paddingHorizontal: 15,
                                    paddingVertical: 5.5,
                                    borderRadius: 5,
                                    marginTop: 10,
                                    flexDirection: 'row',
                                  }}>
                                  <View
                                    style={{
                                      marginRight: 5,
                                      // backgroundColor: 'white',
                                      justifyContent: 'center',
                                      borderRadius: 10,
                                      padding: 0,
                                    }}>
                                    <VHeader
                                      // numberOfLines={1}
                                      type="six"
                                      color={'#ffff'}
                                      text={
                                        isPrivate ? 'GO PUBLIC' : 'GO PRIVATE'
                                      }
                                    />
                                  </View>
                                  <MaterialIcons
                                    name={
                                      !isOwner
                                        ? 'follow-the-signs'
                                        : isPrivate
                                        ? 'public'
                                        : 'public-off'
                                    }
                                    size={20}
                                    color={'#ffff'}
                                  />
                                </View>
                              </Pressable>
                            )}
                          </View>
                        </View>
                      </View>

                      <TabView
                        navigationState={{index, routes}}
                        style={{
                          // backgroundColor: '#1a1a1a',
                          borderTopRightRadius: 25,
                          // borderTopLeftRadius: 30,
                          marginRight: 7,
                          flex: 3,
                        }}
                        renderScene={({route}) => {
                          switch (route.key) {
                            case 'second':
                              console.log(
                                '🚀 ~ file: Profile.tsx ~ line 810 ~ favorites',
                                favorites,
                              );
                              return (
                                <FlatList
                                  // horizontal
                                  data={
                                    isOwner
                                      ? favorites
                                      : JSON.parse(item.favorites)
                                  }
                                  style={{height: 200}}
                                  // numColumns={3}
                                  renderItem={({item, index}: any) => {
                                    console.log(
                                      '🚀 ~ file: Profile.tsx ~ line 305 ~ item',
                                      item,
                                    );

                                    const type = item.info;
                                    switch (type) {
                                      case 'topTracks':
                                        return (
                                          <Pressable
                                            onPress={() => handleTRAK(item)}>
                                            <TrendingCard
                                              rank={index + 1}
                                              artwork={
                                                item.album.images[0]?.url
                                              }
                                              title={item.artists[0].name}
                                              artist={item.name}
                                              status={'same'}
                                            />
                                          </Pressable>
                                        );
                                      case 'heavyRotation':
                                        return (
                                          <Pressable
                                            onPress={() => handleTRAK(item)}>
                                            <TrendingCard
                                              rank={index + 1}
                                              artwork={item.artwork}
                                              title={item.attributes.artistName}
                                              artist={item.attributes.name}
                                              status={'same'}
                                            />
                                          </Pressable>
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
                                  data={
                                    isOwner
                                      ? playlists
                                      : JSON.parse(item.playlists)
                                  }
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
                                          <Pressable
                                            onPress={() =>
                                              handlePlaylistNavigation(item)
                                            }>
                                            <TrendingCard
                                              // rank={'index + 1'}
                                              artwork={item.images[0]?.url}
                                              title={item.owner.display_name}
                                              artist={item.name}
                                              // status={'same'}
                                            />
                                          </Pressable>
                                        );
                                      case 'playlists:apple_music':
                                        console.log(item, 'vrewhe');
                                        return (
                                          <TrendingCard
                                            // rank={index + 1}
                                            artwork={
                                              item.attributes.artwork?.url
                                            }
                                            title={item.attributes.name}
                                            artist={''}
                                            // status={'same'}
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
                            case 'fourth':
                              return (
                                <FlatList
                                  // horizontal
                                  data={
                                    isOwner
                                      ? favorites
                                      : JSON.parse(item.favorites)
                                  }
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
                                        if (loadingArtist === index) {
                                          return (
                                            <Pressable
                                              onPress={() =>
                                                handleArtistNavigation(
                                                  item,
                                                  index,
                                                )
                                              }>
                                              <TrendingCard
                                                artwork={item.images[0]?.url}
                                                title={''}
                                                artist={item.name}
                                              />
                                              <ActivityIndicator
                                                color="#fff"
                                                size="large"
                                                style={{
                                                  position: 'absolute',
                                                  top: 15,
                                                  right: 10,
                                                }}
                                              />
                                            </Pressable>
                                          );
                                        }
                                        return (
                                          <Pressable
                                            onPress={() =>
                                              handleArtistNavigation(
                                                item,
                                                index,
                                              )
                                            }>
                                            <TrendingCard
                                              artwork={item.images[0]?.url}
                                              title={''}
                                              artist={item.name}
                                            />
                                          </Pressable>
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
                            style={{
                              backgroundColor: '#232323',
                              borderBottomWidth: 1,
                              borderBottomColor: '#232323',
                            }}
                            renderLabel={({route, focused, color}) => {
                              let icon;

                              switch (route.title) {
                                case 'WALLET':
                                  return (
                                    <MaterialCommunityIcons
                                      name="bitcoin"
                                      size={25}
                                      color={'#fff'}
                                    />
                                  );
                                case 'TOP TRACKS':
                                  return (
                                    <Ionicons
                                      name="ios-musical-notes"
                                      size={22}
                                      color={'#fff'}
                                    />
                                  );
                                case 'TOP ARTISTS':
                                  return (
                                    <MaterialIcons
                                      name="face-retouching-natural"
                                      size={22}
                                      color={'#fff'}
                                    />
                                  );
                                case 'PLAYLISTS':
                                  return (
                                    <MaterialIcons
                                      name="playlist-play"
                                      size={25}
                                      color={'#fff'}
                                    />
                                  );
                                default:
                                  return (
                                    <MaterialIcons
                                      name="alternate-email"
                                      size={15}
                                      color={'#fff'}
                                    />
                                  );
                              }
                              // {key: 'first', title: 'WALLET'},
                              // {key: 'second', title: 'TOP TRACKS'},
                              // {key: 'fourth', title: 'TOP ARTISTS'},
                              // {key: 'third', title: 'PLAYLISTS'},
                            }}
                            indicatorStyle={{
                              backgroundColor: colors.light.primary,
                            }}
                          />
                        )}
                      />
                    </View>
                  );
                case 'third':
                  // land ahoi
                  console.log(
                    '🚀 ~ file: Profile.tsx ~ line 357 ~ profile.wallet',
                    profile.wallet,
                  );
                  return (
                    <View>
                      <View
                        style={{
                          // padding: 5,
                          // width: '100%',
                          flexDirection: 'row',
                          backgroundColor: '#1a1a1a',
                          margin: 8,
                          borderRadius: 18,
                          // borderWidth: 3,
                          borderColor: 'grey',
                          // borderBottomWidth: 1,
                          // borderBottomColor: '#fff',
                          height: 200,
                        }}>
                        <Image
                          source={{uri: profileObj.avatarURL}}
                          style={{
                            backgroundColor: '#1B4F26',
                            height: 130,
                            width: 130,
                            alignSelf: 'center',
                            marginHorizontal: 10,
                            borderRadius: 60,
                            borderWidth: 4,
                            borderColor: '#333333',
                          }}
                        />
                        <View
                          style={{
                            paddingVertical: 15,
                            justifyContent: 'center',
                            flex: 1,
                            paddingTop: 30,
                            marginLeft: 15,
                          }}>
                          <View style={{flexDirection: 'row'}}>
                            <View
                              style={{
                                marginRight: 15,
                                backgroundColor: '#1a1a1a',
                                justifyContent: 'center',
                                borderRadius: 7,
                                padding: 6,
                              }}>
                              <MaterialIcons
                                name="alternate-email"
                                size={17}
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
                                color={'#cecece'}
                                text={profileObj.trak_name}
                              />
                              <Body
                                numberOfLines={1}
                                type="one"
                                color={'#663355'}
                                text={'  [' + profileObj.trak_symbol + ']'}
                              />
                              <View
                                style={{flexDirection: 'row', marginLeft: 3}}>
                                <Ionicons
                                  name="ios-flame-sharp"
                                  size={20}
                                  color={'orange'}
                                />
                                <Text
                                  style={{
                                    fontSize: 11,
                                    fontWeight: 'bold',
                                    color: '#cecece',
                                  }}>
                                  {profileObj.streak}
                                </Text>
                              </View>
                            </View>
                          </View>

                          <View style={{flexDirection: 'row', marginTop: 10}}>
                            <View
                              style={{
                                marginRight: 15,
                                backgroundColor: '#1a1a1a',
                                justifyContent: 'center',
                                borderRadius: 7,
                                padding: 6,
                              }}>
                              <MaterialCommunityIcons
                                name="format-quote-close"
                                size={17}
                                color={'#fff'}
                              />
                            </View>
                            <View style={{justifyContent: 'center'}}>
                              <Body
                                // numberOfLines={1}
                                type="two"
                                color={'#cecece'}
                                text={'"' + profileObj.quotable + '"'}
                              />
                            </View>
                          </View>
                          <View style={{flexDirection: 'row', marginTop: 10}}>
                            <View
                              style={{
                                marginRight: 15,
                                backgroundColor: '#1a1a1a',
                                justifyContent: 'center',
                                borderRadius: 7,
                                padding: 6,
                              }}>
                              <MaterialIcons
                                name="category"
                                size={17}
                                color={'#fff'}
                              />
                            </View>
                            <View style={{justifyContent: 'center'}}>
                              {/* <Body
                        // numberOfLines={1}
                        type="two"
                        color={'#1a1a1a'}
                        text={item.userCategory + ' user'}
                      /> */}
                              {profileObj.userCategory === 'spotify' && (
                                <Fontisto
                                  name="spotify"
                                  size={18}
                                  color={'#cecece'}
                                />
                              )}
                              {profileObj.userCategory === 'primary' && (
                                <View style={{flexDirection: 'row'}}>
                                  <View style={{marginRight: 5}}>
                                    <Fontisto
                                      name="spotify"
                                      size={18}
                                      color={'#cecece'}
                                    />
                                  </View>
                                  <Fontisto
                                    name="applemusic"
                                    size={18}
                                    color={'#cecece'}
                                  />
                                </View>
                              )}
                              {profileObj.userCategory === 'apple_music' && (
                                <Fontisto
                                  name="applemusic"
                                  size={18}
                                  color={'#cecece'}
                                />
                              )}
                            </View>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              marginTop: 2,
                              paddingRight: 10,
                              width: '100%',
                              // backgroundColor: 'red',
                              justifyContent: 'flex-end',
                            }}>
                            {!isOwner ? (
                              <Pressable onPress={handleToggleFollowUser}>
                                <View
                                  style={{
                                    backgroundColor: '#232323',
                                    // borderWidth: 3,
                                    borderColor: 'grey',
                                    alignSelf: 'flex-start',
                                    paddingHorizontal: 10,
                                    paddingVertical: 3,
                                    borderRadius: 5,
                                    marginTop: 10,
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
                              <Pressable
                                onPress={handleToggleProfileVisibility}>
                                <View
                                  style={{
                                    backgroundColor: '#232323',
                                    // borderWidth: 3,
                                    borderColor: 'grey',
                                    alignSelf: 'flex-start',
                                    paddingHorizontal: 15,
                                    paddingVertical: 5.5,
                                    borderRadius: 5,
                                    marginTop: 10,
                                    flexDirection: 'row',
                                  }}>
                                  <View
                                    style={{
                                      marginRight: 5,
                                      // backgroundColor: 'white',
                                      justifyContent: 'center',
                                      borderRadius: 10,
                                      padding: 0,
                                    }}>
                                    <VHeader
                                      // numberOfLines={1}
                                      type="six"
                                      color={'#ffff'}
                                      text={
                                        isPrivate ? 'GO PUBLIC' : 'GO PRIVATE'
                                      }
                                    />
                                  </View>
                                  <MaterialIcons
                                    name={
                                      !isOwner
                                        ? 'follow-the-signs'
                                        : isPrivate
                                        ? 'public'
                                        : 'public-off'
                                    }
                                    size={20}
                                    color={'#ffff'}
                                  />
                                </View>
                              </Pressable>
                            )}
                          </View>
                        </View>
                      </View>

                      {profile.likes.length == 0 && (
                        <SafeAreaView
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#1a1a1a',
                            margin: 25,
                          }}>
                          <Text
                            style={{
                              fontSize: 30,
                              fontWeight: 'bold',
                              textAlign: 'center',
                              color: 'whitesmoke',
                            }}>
                            Discover and like content to build your catalog
                          </Text>
                          <Button
                            title="FIND NEW MUSIC"
                            onPress={handleNavigateSwipe}
                          />
                        </SafeAreaView>
                      )}

                      <FlatList
                        // scrollEnabled={false}
                        style={{height: 400}}
                        data={profile.likes ?? []}
                        renderItem={({item, index}) => {
                          console.log(
                            '🚀 ~ file: Profile.tsx ~ line 374 ~ item',
                            item,
                          );
                          return (
                            <Pressable onPress={() => handleCatalogTRAK(item)}>
                              <TrendingCard
                                artwork={item.thumbnail}
                                title={item.title}
                                artist={item.artist}
                              />
                            </Pressable>
                          );
                        }}
                        // showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => '' + index}
                        listKey="Recomendations"
                      />
                    </View>
                  );
                case 'second':
                  console.log(
                    '🚀 ~ file: Profile.tsx ~ line 357 ~ profile.wallet',
                    profile.wallet,
                  );
                  return (
                    <View style={{flex: 1}}>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#cecece',
                          padding: 20,
                          margin: 10,
                          borderRadius: 15,
                          height: 200,
                        }}>
                        <View style={{flexDirection: 'row'}}>
                          <VHeader
                            numberOfLines={1}
                            type="two"
                            color={'#000'}
                            text={`0 TUC`}
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                          width: '70%',
                          alignSelf: 'center',
                          marginBottom: 10,
                        }}>
                        {/* <Pressable onPress={(handleSendCrypto)}> */}
                        <Pressable
                          onPress={() => alert('Sending crypto coming soon')}>
                          <View
                            style={{
                              backgroundColor: 'whitesmoke',
                              borderWidth: 3,
                              borderColor: 'whitesmoke',
                              alignSelf: 'flex-start',
                              paddingHorizontal: 15,
                              paddingVertical: 5.5,
                              borderRadius: 10,
                              marginTop: 5,
                              flexDirection: 'row',
                            }}>
                            <View
                              style={{
                                marginRight: 5,
                                // backgroundColor: 'white',
                                justifyContent: 'center',
                                borderRadius: 10,
                                padding: 0,
                              }}>
                              <VHeader
                                // numberOfLines={1}
                                type="five"
                                color={'#232323'}
                                text={'SEND'}
                              />
                            </View>
                            <MaterialIcons
                              name={'arrow-right'}
                              size={22}
                              color={'#232323'}
                            />
                          </View>
                        </Pressable>
                        <Pressable
                          onPress={() =>
                            alert(
                              'Its simple to recieve crypto - just give your publicKey to someone.',
                            )
                          }>
                          <View
                            style={{
                              backgroundColor: '#232323',
                              borderWidth: 3,
                              borderColor: '#232323',
                              alignSelf: 'flex-start',
                              paddingHorizontal: 15,
                              paddingVertical: 5.5,
                              borderRadius: 10,
                              marginTop: 5,
                              flexDirection: 'row',
                            }}>
                            <View
                              style={{
                                marginRight: 5,
                                // backgroundColor: 'white',
                                justifyContent: 'center',
                                borderRadius: 10,
                                padding: 0,
                              }}>
                              <VHeader
                                // numberOfLines={1}
                                type="five"
                                color={'whitesmoke'}
                                text={'RECEIEVE'}
                              />
                            </View>
                            <MaterialIcons
                              name={'arrow-left'}
                              size={23}
                              color={'whitesmoke'}
                            />
                          </View>
                        </Pressable>
                      </View>
                      <TabView
                        // style={{backgroundColor: '#333333'}}
                        navigationState={{index: index1, routes: routes1}}
                        renderScene={({route}) => {
                          switch (route.key) {
                            case 'first':
                              console.log(
                                '🚀 ~ file: Profile.tsx ~ line 357 ~ profile.wallet',
                                wallet,
                              );
                              return (
                                <FlatList
                                  data={wallet ?? []}
                                  renderItem={({item, index}) => {
                                    console.log(
                                      '🚀 ~ file: Profile.tsx ~ line 374 ~ item',
                                      item,
                                    );

                                    const blockchain = Object.keys(item)[0];
                                    console.log(
                                      '🚀 ~ file: Profile.tsx ~ line 1148 ~ blockchain',
                                      blockchain,
                                    );

                                    switch (blockchain) {
                                      case 'bitcoin':
                                        return (
                                          <TrendingCard
                                            artwork={
                                              'https://bitcoin.org/img/icons/opengraph.png?1657703267'
                                            }
                                            title={'BITCOIN'}
                                            artist={
                                              wallet[0].bitcoin.balance + ' BTC'
                                            }
                                            detail1={
                                              profile.tuc_public_keys.bitcoin
                                            }
                                          />
                                        );
                                      case 'stacks':
                                        return (
                                          <TrendingCard
                                            artwork={
                                              'https://motivationgrid.com/wp-content/uploads/2022/04/Stacks.jpg'
                                            }
                                            title={'STACKS'}
                                            artist={
                                              wallet[1].stacks.stx.balance +
                                              ' STX'
                                            }
                                            detail1={
                                              profile.tuc_public_keys.bitcoin
                                            }
                                          />
                                        );

                                      default:
                                        return (
                                          <View
                                            style={{
                                              flex: 1,
                                              backgroundColor: 'red',
                                              margin: 5,
                                              paddingHorizontal: 5,
                                              paddingVertical: 20,
                                            }}>
                                            <Text style={{color: '#fff'}}>
                                              {JSON.stringify(wallet[item])}
                                              {/* {item} */}
                                            </Text>
                                          </View>
                                        );
                                    }
                                  }}
                                  // showsHorizontalScrollIndicator={false}
                                  keyExtractor={(item, index) => '' + index}
                                  listKey="Recomendations"
                                />
                                // </SafeAreaView>
                              );
                            case 'second':
                              if (transactions.length === 0) {
                                return (
                                  // WE HERE
                                  <SafeAreaView
                                    style={{
                                      flex: 1,
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      backgroundColor: '#1a1a1a',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: 30,
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        color: 'whitesmoke',
                                        padding: 30,
                                      }}>
                                      TRANSACTION R COMING SOON
                                    </Text>
                                  </SafeAreaView>
                                );
                              }

                              return (
                                <SafeAreaView
                                  style={{
                                    flex: 1,
                                    backgroundColor: '#1a1a1a',
                                  }}>
                                  <View>
                                    <FlatList
                                      data={transactions}
                                      renderItem={({
                                        item: {success, payload},
                                      }: any) => {
                                        console.log(
                                          '🚀 ~ file: Profile.tsx ~ line 1248 ~ payload',
                                          payload,
                                        );
                                        console.log(
                                          '🚀 ~ file: Profile.tsx ~ line 1246 ~ item',
                                          item,
                                        );

                                        const txProps = {
                                          burn_block_time_iso:
                                            payload?.burn_block_time_iso,
                                          parent_burn_block_time_iso:
                                            payload?.parent_burn_block_time_iso,
                                          sender_address:
                                            payload?.sender_address,
                                          token_transfer:
                                            payload?.token_transfer,
                                          tx_status: payload?.tx_status,
                                          tx_type: payload?.tx_type,
                                        };

                                        if (!success) {
                                          // return <Text>'ERROR'</Text>;

                                          return (
                                            <View
                                              style={{
                                                flex: 1,
                                                justifyContent: 'space-around',
                                                // margin: 5,
                                                borderRadius: 8,
                                                backgroundColor: '#1a1a1a ',
                                                padding: 10,
                                                height: 65,
                                                borderBottomWidth: 1.2,
                                                borderBottomColor: '#cecece',
                                              }}>
                                              <View
                                                style={{
                                                  // margin: 5,
                                                  flex: 2,
                                                  justifyContent: 'center',
                                                }}>
                                                <Text style={{color: '#fff'}}>
                                                  VOID TRX TRANSACTION
                                                </Text>
                                                <Text style={{color: '#fff'}}>
                                                  {payload.recipientURL}
                                                </Text>
                                              </View>
                                              <View
                                                style={{
                                                  flex: 1,
                                                  alignItems: 'flex-end',
                                                  justifyContent: 'center',
                                                }}>
                                                <Text style={{color: '#fff'}}>
                                                  {moment(
                                                    payload.createdAt,
                                                  ).fromNow()}
                                                </Text>
                                              </View>
                                            </View>
                                          );
                                        }

                                        const value =
                                          txProps.token_transfer?.amount *
                                          Math.pow(10, -6);

                                        const trak_name =
                                          payload.recipientURI.split(':')[1];

                                        return (
                                          <View
                                            style={{
                                              flexDirection: 'row',
                                              flex: 1,
                                              justifyContent: 'space-around',
                                              margin: 5,
                                              height: 100,
                                              borderBottomWidth: 1.2,
                                              borderBottomColor: '#cecece',
                                            }}>
                                            <View
                                              style={{
                                                flex: 1,
                                                alignItems: 'flex-start',
                                                justifyContent: 'center',
                                                padding: 8,
                                              }}>
                                              {payload.length !== 0 ? (
                                                <>
                                                  <View
                                                    style={{
                                                      flexDirection: 'row',
                                                    }}>
                                                    <Text
                                                      style={{color: '#fff'}}>
                                                      {txProps?.tx_status ===
                                                      'pending'
                                                        ? 'Sending '
                                                        : txProps?.tx_status ===
                                                          'success'
                                                        ? 'Sent '
                                                        : 'Failed to send '}
                                                    </Text>
                                                    <Text
                                                      style={{color: '#fff'}}>
                                                      {value.toFixed(3)} STX
                                                    </Text>
                                                    <Text
                                                      style={{color: '#fff'}}>
                                                      {' to '}
                                                    </Text>
                                                    <Text
                                                      style={{color: '#fff'}}
                                                      numberOfLines={1}>
                                                      {trak_name}
                                                    </Text>
                                                  </View>

                                                  <View
                                                    style={{
                                                      flexDirection: 'row',
                                                    }}>
                                                    <Text
                                                      style={{color: '#fff'}}>
                                                      {txProps?.tx_type}
                                                    </Text>
                                                    <Text
                                                      style={{
                                                        color: '#fff',
                                                        marginHorizontal: 2,
                                                      }}>
                                                      •
                                                    </Text>
                                                    <Text
                                                      style={{color: '#fff'}}>
                                                      {txProps?.tx_status}
                                                    </Text>
                                                  </View>
                                                  {/* <Text numberOfLines={1}>{txProps?.sender_address}</Text> */}
                                                  {/* <Text>{txProps?.burn_block_time_iso}</Text> */}
                                                </>
                                              ) : (
                                                <Text style={{color: '#fff'}}>
                                                  {payload.length == 0
                                                    ? 'error'
                                                    : null}
                                                </Text>
                                              )}
                                            </View>
                                            <View
                                              style={{
                                                // margin: 5,
                                                padding: 8,
                                                justifyContent: 'flex-end',
                                                alignItems: 'center',
                                                // backgroundColor: 'red',
                                              }}>
                                              <Text style={{color: '#fff'}}>
                                                {moment(
                                                  payload.receipt_time_iso,
                                                ).fromNow()}
                                              </Text>
                                            </View>
                                          </View>
                                        );
                                      }}
                                      keyExtractor={(item: any, index: any) =>
                                        '' + index
                                      }
                                    />
                                  </View>
                                  {/* <View style={{flex: 1, backgroundColor: 'blue'}}>
                  <Text>Mempool</Text>
                  <FlatList
                    data={mempool}
                    renderItem={({item}: any) => {
                      return <View />;
                    }}
                    keyExtractor={(item: any, index: any) => '' + index}
                  />
                </View> */}
                                </SafeAreaView>
                              );

                            case 'fourth':
                              console.log(
                                '🚀 ~ file: Profile.tsx ~ line 357 ~ profile.wallet',
                                profile.wallet,
                              );
                              return (
                                <SafeAreaView
                                  style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#1a1a1a',
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 30,
                                      fontWeight: 'bold',
                                      textAlign: 'center',
                                      color: 'whitesmoke',
                                      padding: 30,
                                    }}>
                                    STAKING COMING SOON
                                  </Text>
                                </SafeAreaView>
                              );
                            // case 'third':
                            //   console.log(
                            //     '🚀 ~ file: Profile.tsx ~ line 354 ~ profile.wallet.trak',
                            //     profile.wallet.trak,
                            //   );
                            //   if (
                            //     profile.wallet.trak.length !== 0 ||
                            //     JSON.parse(profileObj.wallet.trak.length) !== 0
                            //   )
                            //     return (
                            //       <View
                            //         style={{
                            //           backgroundColor: 'blue',
                            //           flex: 1,
                            //         }}>
                            //         <FlatList
                            //           refreshControl={
                            //             <RefreshControl
                            //               tintColor="#fff"
                            //               refreshing={refreshing}
                            //               onRefresh={handleRefresh}
                            //             />
                            //           }
                            //           // horizontal
                            //           data={
                            //             isOwner
                            //               ? profile.wallet.trak
                            //               : JSON.parse(profileObj.wallet.trak)
                            //           }
                            //           style={{height: 200}}
                            //           // numColumns={3}
                            //           renderItem={({item, index}: any) => {
                            //             console.log(
                            //               '🚀 ~ file: Profile.tsx ~ line 305 ~ item',
                            //               item,
                            //             );

                            //             const type = item.info;

                            //             // if (item.tx_status === 'abort_by_post_condition')
                            //             //   return <View />;

                            //             switch (item.tx_status) {
                            //               case 'abort_by_response':
                            //                 return (
                            //                   <Pressable
                            //                     onPress={() =>
                            //                       handleNFTNavigation(item)
                            //                     }>
                            //                     <TrendingCard
                            //                       // rank={index + 1}
                            //                       artwork={item.cover_art}
                            //                       title={
                            //                         item.contract_call
                            //                           ?.function_name
                            //                       }
                            //                       artist={item.asset_name}
                            //                       detail1={'FAILED'}
                            //                       handleDetail1={() =>
                            //                         handleNextTransaction(
                            //                           item.tx_status,
                            //                           item,
                            //                         )
                            //                       }
                            //                     />
                            //                   </Pressable>
                            //                 );
                            //               case 'abort_by_post_condition':
                            //                 <Pressable
                            //                   onPress={() =>
                            //                     handleNFTNavigation(item)
                            //                   }>
                            //                   <TrendingCard
                            //                     // rank={index + 1}
                            //                     artwork={item.cover_art}
                            //                     title={
                            //                       item.contract_call
                            //                         ?.function_name
                            //                     }
                            //                     artist={item.asset_name}
                            //                     detail1={'FAILED'}
                            //                     handleDetail1={() =>
                            //                       handleNextTransaction(
                            //                         item.tx_status,
                            //                         item,
                            //                       )
                            //                     }
                            //                   />
                            //                 </Pressable>;
                            //               case 'success':
                            //                 return (
                            //                   <Pressable
                            //                     onPress={() =>
                            //                       handleNFTNavigation(item)
                            //                     }>
                            //                     <TrendingCard
                            //                       // rank={index + 1}
                            //                       artwork={item.cover_art}
                            //                       title={
                            //                         item.contract_call
                            //                           ?.function_name
                            //                       }
                            //                       artist={item.asset_name}
                            //                       detail1={
                            //                         item.contract_call
                            //                           ?.function_name ===
                            //                         'user-purchase-whitelist'
                            //                           ? 'CLAIM WHITELIST'
                            //                           : item.contract_call
                            //                               ?.function_name ===
                            //                             'bernard-claim-whitelist'
                            //                           ? 'CLAIM NFT'
                            //                           : 'ACCESS'
                            //                       }
                            //                       handleDetail1={() =>
                            //                         handleNextTransaction(
                            //                           item.tx_status,
                            //                           item,
                            //                         )
                            //                       }
                            //                     />
                            //                   </Pressable>
                            //                 );
                            //               case 'pending':
                            //                 return (
                            //                   <Pressable
                            //                     onPress={() =>
                            //                       handleNFTNavigation(item)
                            //                     }>
                            //                     <TrendingCard
                            //                       // rank={index + 1}
                            //                       artwork={item.cover_art}
                            //                       title={
                            //                         item.contract_call
                            //                           ?.function_name
                            //                       }
                            //                       artist={item.asset_name}
                            //                       detail1={item.tx_status}
                            //                       handleDetail1={() => {
                            //                         console.log(
                            //                           '🚀 ~ file: Profile.tsx ~ line 376 ~ item',
                            //                           item,
                            //                         );
                            //                         handleNextTransaction(
                            //                           item.tx_status,
                            //                           item,
                            //                         );
                            //                       }}
                            //                     />
                            //                   </Pressable>
                            //                 );
                            //               default:
                            //                 return <View />;
                            //             }
                            //           }}
                            //           keyExtractor={(item, index) => '' + index}
                            //         />
                            //       </View>
                            //     );

                            default:
                              return (
                                <SafeAreaView
                                  style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#1a1a1a',
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 30,
                                      fontWeight: 'bold',
                                      textAlign: 'center',
                                      color: 'whitesmoke',
                                      padding: 30,
                                    }}>
                                    No NFTs
                                  </Text>
                                  <Button
                                    title="buy some nfts"
                                    onPress={handleRefresh}
                                  />
                                </SafeAreaView>
                              );
                          }
                        }}
                        onIndexChange={setIndex1}
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
                    </View>
                  );

                default:
                  return (
                    <SafeAreaView
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#1a1a1a',
                      }}>
                      <Text
                        style={{
                          fontSize: 30,
                          fontWeight: 'bold',
                          textAlign: 'center',
                          color: 'whitesmoke',
                          padding: 30,
                        }}>
                        No NFTs
                      </Text>
                      <Button title="buy some nfts" onPress={handleRefresh} />
                    </SafeAreaView>
                  );
              }
            }}
            onIndexChange={setIndex2}
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
        </View>
      </LinearGradient>
    </View>
  );
};
