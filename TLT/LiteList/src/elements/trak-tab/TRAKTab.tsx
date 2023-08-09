import React, {useState} from 'react';
import {
  Button,
  SafeAreaView,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  SectionList,
} from 'react-native';
// @ts-ignore
import {TrendingCard} from '../trending-card/TrendingCard';
import {View, Text, Image} from 'react-native';
import {VHeader, Body} from '../typography';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// @ts-ignore
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import {TrakstarSelect} from '../trakstar-select';

export const TRAKTabElement = ({
  trak,
  metaTRAK,
  handleTRAK,
  modal,
  results,
  item = null,
  TRXProfile,
  handleGenius,
  artists,
  albums,
  sectionList,
  handleArtist,
  handleAlbum,
  ...props
}: any) => {
  console.log('🚀 ~ file: TRAKTab.tsx:34 ~ sectionList:', sectionList);
  console.log('🚀 ~ file: TRAKTab.tsx:32 ~ artists:', artists);
  console.log('🚀 ~ file: TRAKTab.tsx ~ line 24 ~ modal', modal);
  console.log('🚀 ~ file: TRAKTab.tsx ~ line 24 ~ results', results);
  console.log('🚀 ~ file: TRAKTab.tsx ~ line 23 ~ metaTRAK', metaTRAK);
  console.log('🚀 ~ file: TRAKTab.tsx ~ line 14 ~ TRAKTabElement ~ trak', trak);

  console.log('🚀 ~ file: TRAKTab.tsx:42 ~ sectionList:', sectionList);

  const hasTRX = true;

  const artist = modal ? item.artist : null;
  const title = modal ? item.title : null;

  if (trak && metaTRAK) return <View />;

  console.log('🚀 ~ file: TRAKTab.tsx:204 ~ sectionList:', sectionList);
  return (
    <LinearGradient colors={['#1a1a1a', '#000']} style={{flex: 1}}>
      <SectionList
        scrollEnabled={item?.modal ? true : false}
        sections={!item?.modal ? sectionList : sectionList.splice(0, 2)}
        ListHeaderComponent={() => (
          <>
            {modal && (
              <>
                <View
                  style={{
                    backgroundColor: '#1db954',
                    padding: 3,
                    paddingHorizontal: 8,
                  }}>
                  <VHeader
                    type="four"
                    color="#1a1a1a"
                    text={`TRX™ METAVERSE `}
                    textAlign="center"
                  />
                </View>
                <View
                  style={{
                    backgroundColor: '#1db954',
                    padding: 3,
                    paddingHorizontal: 8,
                  }}>
                  <VHeader
                    type="five"
                    color="#232323"
                    text={`POWERED BY`}
                    textAlign="center"
                  />
                </View>

                <View
                  style={{
                    paddingBottom: 5,
                    borderRadius: 10,
                  }}>
                  <Image
                    source={{
                      uri: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Genius_Logo.png',
                    }}
                    style={{
                      backgroundColor: '#000',
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
                      color="#1db954"
                      text={`FIND RESULTS FOR THE MEANING AND THE KNOWLEDGE BEHIND :`}
                      textAlign="left"
                    />
                    <View
                      style={{
                        marginTop: 10,
                        backgroundColor: '#1db954',
                        alignSelf: 'flex-end',
                        padding: 10,
                        borderRadius: 5,
                      }}>
                      <VHeader
                        type="four"
                        color="#1a1a1a"
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
        // keyExtractor={(item, index) => index}

        renderItem={({item}: any) => {
          console.log('🚀 ~ file: TRAKTab.tsx:299 ~ item:', item);
          const isTrack = item.result;
          const isArtist = !item.artists;

          if (isTrack) {
            console.log('🚀 ~ file: TRAKTab.tsx:218 ~ item:', item);

            return (
              <TouchableOpacity
                onPress={() => handleTRAK({...item.result, isrc: item.isrc})}>
                <View style={{flex: 1, flexDirection: 'column'}}>
                  <TrakstarSelect
                    // rank={++index}
                    likes
                    artwork={item.result.song_art_image_thumbnail_url}
                    artist={item?.result.artist_names}
                    title={item?.result.title}
                    isDynamic
                    colors={{background: '#fff'}}
                    status={'rising'}
                    // hasLiked={hasLiked}
                    // trak={trak}
                    handleGenius={() => handleGenius({result: item?.result})}
                  />
                </View>
              </TouchableOpacity>
            );
          } else if (isArtist) {
            console.log('🚀 ~ file: TRAKTab.tefesx:218 ~ item:', item);

            return (
              <TouchableOpacity onPress={() => handleArtist({item})}>
                <View style={{flex: 3, flexDirection: 'column'}}>
                  <TrakstarSelect
                    // rank={++index}
                    artwork={item?.images[0]?.url ?? ''}
                    artist={item?.artist}
                    title={item?.name}
                    isDynamic
                    colors={{background: '#fff'}}
                    status={'rising'}
                    // hasLiked={hasLiked}
                    // trak={trak}
                    // handleGenius={() => handleGeniusArtist({item})}
                  />
                </View>
              </TouchableOpacity>
            );
          } else {
            return (
              <TouchableOpacity onPress={() => handleAlbum({item})}>
                <View style={{flex: 3, flexDirection: 'column'}}>
                  <TrakstarSelect
                    // rank={++index}
                    artwork={item?.images[0].url ?? ''}
                    artist={item?.artists[0].name}
                    title={item?.name}
                    isDynamic
                    colors={{background: '#fff'}}
                    status={'rising'}
                    // hasLiked={hasLiked}
                    // trak={trak}
                    handleGenius={() => handleGenius({result: item?.result})}
                  />
                </View>
              </TouchableOpacity>
            );
          }
        }}
        renderSectionHeader={({section: {title}}) => (
          <View style={{marginHorizontal: 20}}>
            <VHeader
              numberOfLines={1}
              type="five"
              color={'#fff'}
              text={title}
            />
          </View>
        )}
      />
    </LinearGradient>
  );
};
