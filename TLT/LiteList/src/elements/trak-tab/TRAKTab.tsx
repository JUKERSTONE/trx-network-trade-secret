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
                    // borderRadius: 8,
                  }}
                  source={{
                    uri: 'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/happy_girl.png?alt=media&token=b056459c-f5b5-4430-a7dc-a21e48d357df',
                  }}
                />

                <View
                  style={{
                    // paddingHorizontal: 15,
                    paddingVertical: 5,
                    borderRadius: 10,
                  }}>
                  <Image
                    source={{
                      uri: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Genius_Logo.png',
                    }}
                    style={{
                      backgroundColor: '#000',
                      // borderRadius: 8,
                      height: 70,
                      width: '100%',
                    }}
                  />

                  <View
                    style={{
                      flexDirection: 'column',
                      padding: 20,
                    }}>
                    <VHeader
                      type="three"
                      color="#ffff64"
                      text={`FIND THE MEANING AND THE KNOWLEDGE BEHIND :`}
                      textAlign="left"
                    />
                    <View style={{marginTop: 10}}>
                      <VHeader
                        type="five"
                        color="#D76A03"
                        text={`'${title}' by ${artist}`}
                        textAlign="right"
                      />
                    </View>
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
              <View style={{flex: 3, flexDirection: 'column'}}>
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
