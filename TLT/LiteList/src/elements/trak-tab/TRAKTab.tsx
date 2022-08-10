import React from 'react';
import {
  Button,
  SafeAreaView,
  ImageBackground,
  FlatList,
  Pressable,
} from 'react-native';
// @ts-ignore
import {TrendingCard} from '../trending-card/TrendingCard';
import {View, Text, Image} from 'react-native';
import {VHeader, Body} from '../typography';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const TRAKTabElement = ({
  trak,
  handleTRAK,
  modal,
  item = null,
  ...props
}: any) => {
  console.log('🚀 ~ file: TRAKTab.tsx ~ line 14 ~ TRAKTabElement ~ trak', trak);

  const artist = modal ? item.artist : null;
  const title = modal ? item.title : null;

  return (
    <View style={{backgroundColor: '#1a1a1a', flex: 1}}>
      <FlatList
        data={trak}
        style={{height: '100%'}}
        ListHeaderComponent={() => (
          <>
            {modal && (
              <>
                <Image
                  style={{
                    height: 200,
                    width: '100%',
                    marginTop: 3,
                    borderRadius: 8,
                  }}
                  source={{
                    uri: 'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/happy_girl.png?alt=media&token=b056459c-f5b5-4430-a7dc-a21e48d357df',
                  }}
                />
                <View
                  style={{
                    // marginBottom: 10,
                    // backgroundColor: '#cecece',
                    // alignSelf: 'center',
                    paddingHorizontal: 15,
                    paddingVertical: 5,
                    borderRadius: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'flex-end',
                      marginBottom: 5,
                    }}>
                    <VHeader
                      type="three"
                      color="yellow"
                      text={`WELCOME TO`}
                      textAlign="right"
                    />
                    <View
                      style={{
                        borderBottomWidth: 2,
                        borderBottomColor: '#333333',
                      }}>
                      <VHeader
                        type="three"
                        color="gold"
                        text={` FANCLUB`}
                        textAlign="right"
                      />
                    </View>
                  </View>

                  <View
                    style={{
                      alignSelf: 'flex-end',
                      marginBottom: 10,
                    }}>
                    <VHeader
                      type="five"
                      color="gold"
                      text={'START EARNING BITCOIN PASSIVELY'}
                      textAlign="right"
                    />
                    <VHeader
                      type="five"
                      color="silver"
                      // text={`TEMPORARILY lock 200STX for 10 DAYS to EARN fanpoints, BITCOIN + 10APR% AND ${artist} merch. `}
                      text={`LOCK UP 200STX FOR 10 DAYS TO EARN FANPOINTS, your STX in BITCOIN + 10APR% AND '${artist}' MERCH.`}
                      textAlign="right"
                    />
                  </View>
                  <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
                    <VHeader
                      type="five"
                      color="#fff"
                      text={`Discover TRAK related to `}
                      textAlign="right"
                    />
                    <VHeader
                      type="five"
                      color="gold"
                      text={` '${title}'`}
                      textAlign="right"
                    />
                    <VHeader
                      type="five"
                      color="#fff"
                      text={` by`}
                      textAlign="right"
                    />
                    <VHeader
                      type="five"
                      color="yellow"
                      text={` ${artist}`}
                      textAlign="right"
                    />
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 2,
                      borderBottomColor: '#ffff',
                      marginTop: 30,
                      alignSelf: 'flex-end',
                      // paddingBottom: 'gold',
                      // marginBottom: -20,
                    }}>
                    <VHeader
                      type="four"
                      color="#ffff"
                      text={`TRAK CONTENT`}
                      // textAlign="right"
                    />
                  </View>
                </View>
              </>
            )}
          </>
        )}
        renderItem={({item, index}) => {
          console.log(
            '🚀 ~ file: TRAKTab.tsx ~ line 37 ~ TRAKTabElement ~ item',
            item,
          );
          const result = item.result;
          return (
            <Pressable onPress={() => handleTRAK(result)}>
              <View style={{flex: 3, flexDirection: 'column', margin: 10}}>
                {/* <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      margin: 15,
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                      maxWidth: '70%',
                    }}>
                    <VHeader
                      type="five"
                      color="white"
                      text={result.title}
                      textAlign="right"
                    />
                    <Body
                      type="two"
                      color="#cecece"
                      text={result.artist_names}
                      textAlign="right"
                    />
                  </View>
                  <Image
                    style={{
                      height: 80,
                      width: '100%',
                      borderRadius: 10,
                      backgroundColor: '#fff',
                    }}
                    source={{
                      uri: result.song_art_image_url,
                    }}
                  />
                </View> */}
                <TrendingCard
                  // rank={++index}
                  artwork={result.song_art_image_url}
                  title={result.artist_names}
                  artist={result.title}
                  isDynamic
                  colors={{background: '#fff'}}
                  status={'rising'}
                />
              </View>
            </Pressable>
          );
        }}
        keyExtractor={item => item.id}
      />
    </View>
  );
};
