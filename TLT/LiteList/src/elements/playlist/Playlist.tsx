import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Button,
  useWindowDimensions,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import {TrendingCard} from '../trending-card/TrendingCard';
// @ts-ignore
import ParallaxScrollView from 'react-native-parallax-scroll-view';

import {VHeader, Body, TrakstarSelect} from '..';
import {APIKeys, api, useAPI} from '../../api';
import {useEffectAsync} from '../../app';
import {useSelector} from 'react-redux';

export const PlaylistElement = ({
  item: playlist,
  handleNavigateTRAK,
  handleTRAK,
  handleGenius,
}: any) => {
  console.log('🚀 ~ file: Seed.tsx ~ line 22 ~ searchResult', playlist);
  const {width, height} = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const {players} = useSelector((state: any) => state.player);
  const [media, setMedia] = useState<any>(null);

  const {useGET} = useAPI();

  useEffectAsync(async () => {
    const hits = await Promise.all(
      playlist.tracks.map(async (item: any) => {
        const route = api.genius({
          method: 'search',
          payload: {query: `${item.track.name} ${item.track.artists[0].name}`},
        });

        const accessToken = APIKeys.genius.accessToken;
        const response: any = await useGET({route, token: accessToken});
        console.log(
          '🚀 ~ file: useTRAKTab.ts ~ line 24 ~ handleSearch ~ response',
          response,
        );

        // filter response.data.response.hits

        const filteredResults = response.data.response.hits.filter(
          (itemG: any) => {
            console.log(
              '🚀 ~ file: useTRAKTab.ts:101 ~ filteredResults ~ item:',
              itemG,
            );
            // Use regex to check if the item's content includes 'youtube' in its URL
            const trxRegex = new RegExp(
              `^(?!(Genius|${!item.track.artists[0]
                .name}|Spotify|Apple Music)).*$`,
              'i',
            );
            return trxRegex.test(itemG.result.artist_names);
          },
        );

        const hit = filteredResults[0];
        console.log(
          '🚀 ~ file: Tape.tsx:41 ~ album.tracks.items.map ~ hit:',
          hit,
        );

        const token = APIKeys.genius.accessToken;
        const geniusId = hit.result.id;
        const route1 = api.genius({method: 'songs', payload: {geniusId}});

        const response1 = await Promise.resolve(
          useGET({route: route1, token}).then((res: any) => {
            return res.data.response.song;
          }),
        );
        console.log(
          '🚀 ~ file: Tape.tsx:49 ~ response1 ~ response1:',
          response1,
        );

        return await response1;
      }),
    );

    const result = hits.filter((item: any) => item.provider !== 'youtube');

    console.log(
      '🚀 ~ file: Tape.tsx:67 ~ album.tracks.items.map ~ result:',
      result,
    );
    console.log('🚀 ~ file: Tape.tsx:44 ~ hits ~ hits:', hits);

    console.log('🚀 ~ file: Tape.tsx:fefe76 ~ useEffectAsync ~ hits:', hits);
    setMedia(result);
  }, []);

  if (media) {
    return (
      <View style={{flex: 1}}>
        <FlatList
          // horizontal
          data={media}
          style={{height: 250}}
          // numColumns={3}
          ListHeaderComponent={() => (
            <Image
              source={{uri: playlist.images}}
              style={{
                flex: 1,
                height: 250,
                backgroundColor: '#1db954',
              }}
            />
          )}
          renderItem={({item, index}: any) => {
            console.log('🚀 ~ file: Profile.tsx ~ line 305 ~ item', item);
            return (
              <TouchableOpacity onPress={() => handleTRAK(item, media, index)}>
                <TrakstarSelect
                  // rank={++index}
                  artwork={item.song_art_image_url}
                  title={item.artist_names}
                  artist={item.title}
                  isDynamic
                  colors={{
                    background:
                      players.youtube.title === item.title ? '#1db954' : '#fff',
                  }}
                  status={'same'}
                  handleGenius={() => handleGenius({result: item})}
                  height={50}
                />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => '' + index}
        />
      </View>
    );
  }

  return (
    <ParallaxScrollView
      backgroundColor="#1a1a1a"
      // contentBackgroundColor={colors ? colors.primary : '#fff'}
      contentBackgroundColor={'#1a1a1a'}
      parallaxHeaderHeight={300}
      stickyHeaderHeight={100}
      renderBackground={() => (
        <ImageBackground
          source={{uri: playlist.images}}
          style={{
            height: 300,
            padding: 6,
            paddingBottom: 80,
            backgroundColor: '#1A1A1A',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}></ImageBackground>
      )}
      // renderForeground={() => (

      // )}
    >
      <FlatList
        // horizontal
        data={playlist.tracks}
        style={{height: '100%'}}
        // numColumns={3}
        renderItem={({item, index}: any) => {
          console.log('🚀 ~ file: Profile.tsx ~ line 305 ~ item', item);
          return (
            <TouchableOpacity
              onPress={() =>
                handleNavigateTRAK({...item, cover_art: playlist.images[0].url})
              }>
              <TrendingCard
                rank={index + 1}
                artwork={item.track.album.images[0].url}
                title={item.track.artists[0].name}
                artist={item.track.name}
                status={'same'}
              />
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => '' + index}
      />
    </ParallaxScrollView>
  );
};
