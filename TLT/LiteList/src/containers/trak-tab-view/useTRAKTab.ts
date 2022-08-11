import {toggleExchangeView, store, setAuthentication} from '../../stores';
import {useLITELISTState} from '../../app';
import auth from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';
import {api, useAPI, APIKeys} from '../../api';

export const useTRAKTab = ({query, navigation}: any) => {
  console.log('🚀 ~ file: useTRAKTab.ts ~ line 8 ~ useTRAKTab ~ query', query);
  const {useGET} = useAPI();
  const [trak, setTRAK] = useState();

  useEffect(() => {
    // console.log(
    //   '🚀 ~ file: useTRAKTab.ts ~ line 15 ~ useEffect ~ genius',
    //   genius,
    // );
    // alert(query);

    handleSearch(query);
  }, [query]);

  const handleSearch = async (query: any) => {
    const route = api.genius({method: 'search', payload: {query}});

    const accessToken = APIKeys.genius.accessToken;
    const response: any = await useGET({route, token: accessToken});
    console.log(
      '🚀 ~ file: useTRAKTab.ts ~ line 24 ~ handleSearch ~ response',
      response,
    );

    const hits = response.data.response.hits;

    setTRAK(hits);
  };

  const handleTRAK = async (result: any) => {
    const token = APIKeys.genius.accessToken;
    const geniusId = result.id;
    const route = api.genius({method: 'songs', payload: {geniusId}});

    const response = useGET({route, token});

    const trak = await Promise.resolve(response).then((res: any) => {
      const song = res.data.response.song;
      console.log('🚀 ~ file: useTRAKTab.ts ~ line 46 ~ trak ~ song', song);

      const meta = {
        genius_url: song.url,
        release_date: song.release_date,
        description: song.description,
        custom_performances: song.custom_performances, // use
        recording_location: song.recording_location,
        writer_artists: song.writer_artists,
        featured_artists: song.featured_artists, // use
        producer_artists: song.producer_artists,
        song_relationships: song.song_relationships,
        // artist : get from genius from socials
      };

      let centralized: any = [];
      let providers: any[] = [
        'apple_music',
        'soundcloud',
        'spotify',
        'youtube',
      ];

      const media = song.media;
      const hasAppleMusic = song.apple_music_id;
      const apple_music = hasAppleMusic ? {id: song.apple_music_id} : null;

      if (hasAppleMusic) {
        centralized.push('apple_music');
      }

      let trak: any = {
        artist: song.artist_names,
        title: song.title,
        thumbnail: song.song_art_image_thumbnail_url,
        apple_music,
        genius: {id: JSON.stringify(geniusId)},
        soundcloud: null,
        spotify: null,
        youtube: null,
      };

      media.map((media: any) => {
        switch (media.provider) {
          case 'soundcloud':
            centralized.push('soundcloud');
            trak[media.provider] = {url: media.url};
            break;
          case 'spotify':
            centralized.push('spotify');
            trak[media.provider] = {uri: media.native_uri};
            break;
          case 'youtube':
            centralized.push('youtube');
            trak[media.provider] = {url: media.url};
            break;
          default:
            trak[media.provider] = {url: media.url};
            break;
        }
      });

      let missingProviders: any = [];

      providers.map((provider: string) => {
        const hasProvider = centralized.includes(provider);
        if (!hasProvider) {
          missingProviders.push(provider);
        }
      });

      //

      const trakCandidate = {
        trak,
        meta,
        missingProviders,
        comments: [],
      };
      console.log(
        '🚀 ~ file: useTRAKTab.ts ~ line 116 ~ Promise.resolve ~ trawwk',
        trakCandidate,
      );
      return trakCandidate;
    });
    console.log(
      '🚀 ~ file: useTRAKTab.ts ~ line 134 ~ handleTRAK ~ trak',
      trak,
    );

    navigation.navigate('MODAL', {
      type: 'trak',
      exchange: {
        active: true,
        item: trak,
      },
    });
  };
  return {
    trak,
    handleTRAK,
    // handleDeposit,
    // handleGoBack,
    // isLoggedIn,
    // handleAuthentication,
  };
};
