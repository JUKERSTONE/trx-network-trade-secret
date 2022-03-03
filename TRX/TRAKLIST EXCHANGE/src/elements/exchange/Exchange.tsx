import React from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  ActivityIndicator,
  Dimensions,
  Pressable,
  Image,
  useWindowDimensions,
  TextInput,
} from 'react-native';
import {styles} from './styles';
import {VHeader, Body, Caption} from '../typography';
import {colors} from '../../core';
import {TabView, TabBar} from 'react-native-tab-view';

export const ExchangeElement = ({
  trak,
  nft,
  handleExchange,
  handleTextInputChange,
}: any) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'TRAK'},
    {key: 'second', title: 'NFT'},
  ]);

  if (trak == null)
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: Dimensions.get('screen').height,
        }}>
        <ActivityIndicator color="blue" size="large" />
      </View>
    );
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>SEARCH EXCHANGE</Text>
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            onChangeText={handleTextInputChange}
            style={{
              color: 'grey',
              fontWeight: 'bold',
              fontSize: 13,
            }}
            placeholder={'search'}
          />
        </View>
      </View>
      <TabView
        navigationState={{index, routes}}
        style={{backgroundColor: colors.light.primary}}
        renderScene={({route}) => {
          switch (route.key) {
            case 'first':
              return (
                <FlatList
                  data={trak}
                  style={{backgroundColor: '#1a1a1a'}}
                  renderItem={({item}) => {
                    const isNFT = item.isNFT;
                    let title: any, artist: any, cover_art, uri: any, id: any;
                    switch (isNFT) {
                      case true:
                        title = item.nft.trakTITLE;
                        artist = item.nft.trakARTIST;
                        cover_art = item.nft.trakIMAGE;
                        uri = item.nftURI;
                        id = item.nftID;
                        break;
                      case false:
                        title = item.title;
                        artist = item.artist;
                        cover_art = item.cover_art;
                        uri = item.trakURI;
                        id = item.trakID;
                        break;
                    }

                    return (
                      <Pressable onPress={() => handleExchange({item})}>
                        <View
                          style={{
                            backgroundColor: '#1a1a1a',
                            padding: 10,
                            marginHorizontal: 5,
                            // borderBottomWidth: 1,
                            borderBottomColor: '#cecece',
                            borderRadius: 10,
                            marginBottom: 5,
                          }}>
                          <View
                            style={{
                              height: 100,
                              flexDirection: 'row',
                              borderRadius: 5,
                            }}>
                            <View
                              style={{
                                justifyContent: 'flex-end',
                                marginRight: 20,
                                flex: 1,
                              }}>
                              <Image
                                source={{uri: cover_art}}
                                style={{
                                  backgroundColor: '#1B4F26',
                                  height: '100%',
                                  width: '100%',
                                  borderRadius: 5,
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
                                color={'#fff'}
                                text={title}
                              />
                              <Body
                                numberOfLines={1}
                                type="one"
                                color={'#fff'}
                                text={artist}
                                textAlign="right"
                              />
                              <View
                                style={{flexDirection: 'row', marginTop: 3}}>
                                <View
                                  style={{
                                    backgroundColor: '#fff',
                                    paddingVertical: 3,
                                    paddingHorizontal: 8,
                                    borderRadius: 3,
                                    marginRight: 5,
                                  }}>
                                  <Caption
                                    numberOfLines={1}
                                    type="one"
                                    color={'green'}
                                    text={'BUY'}
                                    textAlign="right"
                                  />
                                </View>
                                <View
                                  style={{
                                    backgroundColor: 'green',
                                    paddingVertical: 3,
                                    paddingHorizontal: 8,
                                    borderRadius: 3,
                                  }}>
                                  <Caption
                                    numberOfLines={1}
                                    type="one"
                                    color={'#fff'}
                                    text={isNFT ? 'NFT' : 'TRX'}
                                    textAlign="right"
                                  />
                                </View>
                                {!isNFT && (
                                  <View
                                    style={{
                                      backgroundColor: !isNFT
                                        ? '#fff'
                                        : '#1a1a1a',
                                      paddingVertical: 3,
                                      paddingHorizontal: 8,
                                      borderRadius: 3,
                                      marginLeft: 5,
                                    }}>
                                    <Caption
                                      numberOfLines={1}
                                      type="one"
                                      color={!isNFT ? 'green' : '#fff'}
                                      text={'SWAP'}
                                      textAlign="right"
                                    />
                                  </View>
                                )}
                              </View>
                            </View>
                          </View>
                        </View>
                      </Pressable>
                    );
                  }}
                  keyExtractor={item => {
                    switch (item.isNFT) {
                      case true:
                        return item.nftURI;
                      case false:
                        return item.trakURI;
                    }
                  }}
                />
              );
            case 'second':
              return (
                <FlatList
                  data={nft}
                  style={{backgroundColor: '#1a1a1a'}}
                  renderItem={({item}) => {
                    const isNFT = item.isNFT;
                    let title: any, artist: any, cover_art, uri: any, id: any;
                    switch (isNFT) {
                      case true:
                        title = item.nft.trakTITLE;
                        artist = item.nft.trakARTIST;
                        cover_art = item.nft.trakIMAGE;
                        uri = item.nftURI;
                        id = item.nftID;
                        break;
                      case false:
                        title = item.title;
                        artist = item.artist;
                        cover_art = item.cover_art;
                        uri = item.trakURI;
                        id = item.trakID;
                        break;
                    }

                    return (
                      <Pressable onPress={() => handleExchange({item})}>
                        <View
                          style={{
                            backgroundColor: '#1a1a1a',
                            padding: 10,
                            marginHorizontal: 5,
                            // borderBottomWidth: 1,
                            borderBottomColor: '#cecece',
                            borderRadius: 10,
                            marginBottom: 5,
                          }}>
                          <View
                            style={{
                              height: 100,
                              flexDirection: 'row',
                              borderRadius: 5,
                            }}>
                            <View
                              style={{
                                justifyContent: 'flex-end',
                                marginRight: 20,
                                flex: 1,
                              }}>
                              <Image
                                source={{uri: cover_art}}
                                style={{
                                  backgroundColor: '#1B4F26',
                                  height: '100%',
                                  width: '100%',
                                  borderRadius: 5,
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
                                color={'#fff'}
                                text={title}
                              />
                              <Body
                                numberOfLines={1}
                                type="one"
                                color={'#fff'}
                                text={artist}
                                textAlign="right"
                              />
                              <View
                                style={{flexDirection: 'row', marginTop: 3}}>
                                <View
                                  style={{
                                    backgroundColor: '#fff',
                                    paddingVertical: 3,
                                    paddingHorizontal: 8,
                                    borderRadius: 3,
                                    marginRight: 5,
                                  }}>
                                  <Caption
                                    numberOfLines={1}
                                    type="one"
                                    color={'green'}
                                    text={'BUY'}
                                    textAlign="right"
                                  />
                                </View>
                                <View
                                  style={{
                                    backgroundColor: 'green',
                                    paddingVertical: 3,
                                    paddingHorizontal: 8,
                                    borderRadius: 3,
                                  }}>
                                  <Caption
                                    numberOfLines={1}
                                    type="one"
                                    color={'#fff'}
                                    text={isNFT ? 'NFT' : 'TRX'}
                                    textAlign="right"
                                  />
                                </View>
                                {!isNFT && (
                                  <View
                                    style={{
                                      backgroundColor: !isNFT
                                        ? '#fff'
                                        : '#1a1a1a',
                                      paddingVertical: 3,
                                      paddingHorizontal: 8,
                                      borderRadius: 3,
                                      marginLeft: 5,
                                    }}>
                                    <Caption
                                      numberOfLines={1}
                                      type="one"
                                      color={!isNFT ? 'green' : '#fff'}
                                      text={'SWAP'}
                                      textAlign="right"
                                    />
                                  </View>
                                )}
                              </View>
                            </View>
                          </View>
                        </View>
                      </Pressable>
                    );
                  }}
                  keyExtractor={item => {
                    switch (item.isNFT) {
                      case true:
                        return item.nftURI;
                      case false:
                        return item.trakURI;
                    }
                  }}
                />
              );
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
            style={{backgroundColor: colors.light.primary}}
            renderLabel={({route, focused, color}) => (
              <Text
                style={{
                  color: !focused ? '#1a1a1a' : '#fff',
                  fontSize: 15,
                  fontWeight: 'bold',
                }}>
                {route.title}
              </Text>
            )}
            indicatorStyle={{backgroundColor: '#fff'}}
          />
        )}
      />
    </>
  );
};
