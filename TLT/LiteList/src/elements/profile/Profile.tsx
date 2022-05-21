import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  ScrollView,
  ImageBackground,
  Image,
} from 'react-native';
import React, {useEffect} from 'react';
import {VHeader, Body} from '../typography';
import {useLITELISTState} from '../../app';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const ProfileElement = ({item, isOwner, streaming}: any) => {
  console.log(
    '🚀 ~ file: Profile.tsx ~ line 15 ~ ProfileElement ~ streaming',
    streaming,
  );
  return (
    <ScrollView style={{backgroundColor: '#1a1a1a'}}>
      <View style={{alignItems: 'center', backgroundColor: '#1a1a1a'}}>
        <View
          style={{
            // padding: 10,
            width: '100%',
            borderRadius: 10,
            flexDirection: 'row',
            backgroundColor: '#333333',
            borderBottomWidth: 1,
            borderBottomColor: '#fff',
          }}>
          <Image
            source={{uri: item.avatarURL}}
            style={{
              backgroundColor: '#1B4F26',
              height: 150,
              width: 150,
              borderRadius: 15,
            }}
          />
          <View
            style={{
              padding: 10,
              justifyContent: 'center',
              flex: 1,
            }}>
            <View style={{flexDirection: 'row'}}>
              <VHeader
                numberOfLines={1}
                type="four"
                color={'#fff'}
                text={item.user_name}
              />
              <View style={{marginHorizontal: 5}}>
                <VHeader
                  numberOfLines={1}
                  type="four"
                  color={'#fff'}
                  text={'•'}
                />
              </View>

              <Body
                numberOfLines={1}
                type="one"
                color={'#fff'}
                text={'[' + item.trak_symbol + ']'}
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

            <View style={{width: '90%'}}>
              <Body
                // numberOfLines={1}
                type="two"
                color={'#fff'}
                text={'"' + item.quotable + '"'}
              />
            </View>
            {!isOwner ? (
              <View
                style={{
                  backgroundColor: 'green',
                  alignSelf: 'flex-start',
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 5,
                  marginTop: 5,
                }}>
                <VHeader
                  // numberOfLines={1}
                  type="five"
                  color={'#1a1a1a'}
                  text={'FOLLOW'}
                />
              </View>
            ) : (
              <View
                style={{
                  backgroundColor: 'green',
                  alignSelf: 'flex-start',
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 5,
                  marginTop: 5,
                }}>
                <VHeader
                  // numberOfLines={1}
                  type="five"
                  color={'#fff'}
                  text={'GO PUBLIC'}
                />
              </View>
            )}
          </View>
        </View>

        <View style={{width: '100%'}}>
          <View style={{marginLeft: 20, marginTop: 10}}>
            <VHeader
              numberOfLines={1}
              type="four"
              color={'#fff'}
              text={'SPOTIFY'}
            />
          </View>
          <FlatList
            horizontal
            data={streaming}
            style={{height: 200}}
            // numColumns={3}
            renderItem={({item, index}: any) => {
              const type = item.info;
              switch (type) {
                case 'topTracks':
                  return (
                    <View
                      style={{
                        backgroundColor: '#1DB954',
                        margin: 10,
                        width: 160,
                        borderRadius: 15,
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 10,
                      }}>
                      <ImageBackground
                        source={item.album.images}
                        style={{
                          height: '100%',
                          width: '100%',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                        imageStyle={{borderRadius: 10}}>
                        <View style={{padding: 8}}>
                          <Ionicons
                            name="ios-flame-sharp"
                            size={23}
                            color={'#fff'}
                          />
                        </View>
                        <View style={{padding: 8}}>
                          <Ionicons
                            name="ios-musical-notes-sharp"
                            size={23}
                            color={'#fff'}
                          />
                        </View>
                      </ImageBackground>
                    </View>
                  );
                case 'topArtists':
                  return (
                    <View
                      style={{
                        backgroundColor: '#1DB954',
                        margin: 10,
                        width: 160,
                        borderRadius: 15,
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 10,
                      }}>
                      <ImageBackground
                        source={item.images}
                        style={{
                          height: '100%',
                          width: '100%',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                        imageStyle={{borderRadius: 10}}>
                        <View style={{padding: 8}}>
                          <Ionicons
                            name="ios-flame-sharp"
                            size={23}
                            color={'#fff'}
                          />
                        </View>
                        <View style={{padding: 8}}>
                          <MaterialIcons
                            name="face-retouching-natural"
                            size={23}
                            color={'#fff'}
                          />
                        </View>
                      </ImageBackground>
                    </View>
                  );
                case 'playlists':
                  return (
                    <View
                      style={{
                        backgroundColor: '#1DB954',
                        margin: 10,
                        width: 160,
                        borderRadius: 15,
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 10,
                      }}>
                      <ImageBackground
                        source={item.images}
                        style={{
                          height: '100%',
                          width: '100%',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                        imageStyle={{borderRadius: 10}}>
                        <View style={{padding: 8}}>
                          <Ionicons
                            name="ios-flame-sharp"
                            size={23}
                            color={'#fff'}
                          />
                        </View>
                        <View style={{padding: 8}}>
                          <MaterialCommunityIcons
                            name="playlist-music"
                            size={23}
                            color={'#fff'}
                          />
                        </View>
                      </ImageBackground>
                    </View>
                  );
                default:
                  return (
                    <View
                      style={{
                        backgroundColor: '#fff',
                        margin: 10,
                        width: 150,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text>fe</Text>
                    </View>
                  );
              }
            }}
            keyExtractor={(item, index) => '' + index}
          />
          <View style={{marginLeft: 20, marginTop: 10}}>
            <VHeader
              numberOfLines={1}
              type="four"
              color={'#fff'}
              text={'SOUNDCLOUD'}
            />
          </View>
          <FlatList
            horizontal
            data={streaming}
            style={{height: 200}}
            // numColumns={3}
            renderItem={({item, index}: any) => {
              const type = item.info;
              switch (type) {
                case 'topTracks':
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
                      <View>
                        {/*  */}
                        {/*  */}
                      </View>
                    </View>
                  );
                default:
                  return (
                    <View
                      style={{
                        backgroundColor: '#fff',
                        margin: 10,
                        width: 150,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text>fe</Text>
                    </View>
                  );
              }
            }}
            keyExtractor={(item, index) => '' + index}
          />
          <View style={{marginLeft: 20, marginTop: 10}}>
            <VHeader
              numberOfLines={1}
              type="four"
              color={'#fff'}
              text={'APPLE MUSIC'}
            />
          </View>
          <FlatList
            horizontal
            data={streaming}
            style={{height: 200}}
            // numColumns={3}
            renderItem={({item, index}: any) => {
              const type = item.info;
              switch (type) {
                case 'topTracks':
                  return (
                    <View
                      style={{
                        backgroundColor: '#fc3c44',
                        margin: 10,
                        width: 150,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <View>
                        {/*  */}
                        {/*  */}
                      </View>
                    </View>
                  );
                default:
                  return (
                    <View
                      style={{
                        backgroundColor: '#fff',
                        margin: 10,
                        width: 150,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text>fe</Text>
                    </View>
                  );
              }
            }}
            keyExtractor={(item, index) => '' + index}
          />
        </View>

        <View style={{width: '100%'}}>
          <View style={{marginLeft: 20, marginTop: 10}}>
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
        </View>
      </View>
    </ScrollView>
  );
};
