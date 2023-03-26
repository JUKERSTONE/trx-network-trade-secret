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
  Dimensions,
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
// @ts-ignore
import ParallaxScrollView from 'react-native-parallax-scroll-view';

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

  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    {key: 'first', title: 'TOP TRACKS'},
    {key: 'second', title: 'TOP ARTISTS'},
    {key: 'third', title: 'PLAYLISTS'},
  ]);

  const layout = useWindowDimensions();

  const isPrivate = useSelector((state: any) => state.profile.TRX.isPrivate);
  const profileTRX = useSelector((state: any) => state.profile.TRX);
  const {wallet} = useSelector((state: any) => state.crypto);
  console.log('🚀 ~ file: Profile.tsx ~ line 97 ~ wallet', wallet);
  console.log('🚀 ~ file: Profile.tsx ~ line 96 ~ profileTRX', profileTRX);

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
          {/* top part */}
          <View style={{flex: 1}}>
            {/* bottom part */}

            <ParallaxScrollView
              backgroundColor="transparent"
              contentBackgroundColor={'transparent'}
              parallaxHeaderHeight={180}
              stickyHeaderHeight={100}
              // renderBackground={() => (
              //   <ImageBackground
              //     source={artist.images}
              //     style={{
              //       height: 300,
              //       padding: 6,
              //       paddingBottom: 80,
              //       backgroundColor: '#1A1A1A',
              //       justifyContent: 'flex-end',
              //       alignItems: 'center',
              //     }}></ImageBackground>
              // )}
              renderForeground={() => (
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
                    height: 150,
                    // flex: 1,
                  }}>
                  <Image
                    source={{uri: profileObj.avatarURL}}
                    style={{
                      backgroundColor: '#1B4F26',
                      height: 90,
                      width: 90,
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
                        <View style={{flexDirection: 'row', marginLeft: 3}}>
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
                        <Pressable onPress={handleToggleProfileVisibility}>
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
                                text={isPrivate ? 'GO PUBLIC' : 'GO PRIVATE'}
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
              )}>
              <View style={{height: Dimensions.get('screen').height * 3}}>
                <TabView
                  navigationState={{index, routes}}
                  style={
                    {
                      // backgroundColor: '#1a1a1a',
                      // borderTopRightRadius: 25,
                      // borderTopLeftRadius: 30,
                      // marginRight: 7,
                      // flex: 1,
                      // height: '100%',
                    }
                  }
                  renderScene={({route}) => {
                    switch (route.key) {
                      case 'first':
                        console.log(
                          '🚀 ~ file: Profile.tsx ~ line 810 ~ favorites',
                          favorites,
                        );
                        return (
                          <FlatList
                            scrollEnabled={false}
                            // horizontal
                            data={
                              isOwner ? favorites : JSON.parse(item.favorites)
                            }
                            style={{
                              height: 200,
                              // backgroundColor: 'red',
                            }}
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
                                    <Pressable onPress={() => handleTRAK(item)}>
                                      <TrendingCard
                                        rank={index + 1}
                                        artwork={item.album.images[0]?.url}
                                        title={item.artists[0].name}
                                        artist={item.name}
                                        status={'same'}
                                      />
                                    </Pressable>
                                  );
                                case 'heavyRotation':
                                  return (
                                    <Pressable onPress={() => handleTRAK(item)}>
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

                      case 'second':
                        return (
                          <FlatList
                            scrollEnabled={false}
                            data={
                              isOwner ? favorites : JSON.parse(item.favorites)
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
                                          handleArtistNavigation(item, index)
                                        }>
                                        <TrendingCard
                                          rank={index + 1}
                                          status={'same'}
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
                                        handleArtistNavigation(item, index)
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
                      case 'third':
                        return (
                          <FlatList
                            scrollEnabled={false}
                            data={
                              isOwner ? playlists : JSON.parse(item.playlists)
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
                                      artwork={item.attributes.artwork?.url}
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
            </ParallaxScrollView>

            {/* hold */}
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};
