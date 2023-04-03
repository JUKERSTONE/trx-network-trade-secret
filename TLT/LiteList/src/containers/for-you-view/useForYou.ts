import {toggleExchangeView, store, setAuthentication} from '../../stores';
import {useLITELISTState} from '../../app';
import auth from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';
import {api, useAPI, APIKeys} from '../../api';
import algoliasearch from 'algoliasearch';
import {ALGOLIA_APP_ID, ALGOLIA_API_KEY} from '../../auth';

export const useForYou = ({query, navigation}: any) => {
  console.log('🚀 ~ file: useTRAKTab.ts ~ line 8 ~ useTRAKTab ~ query', query);
  const {useGET} = useAPI();
  const [trak, setTRAK] = useState<any>([]);
  const [metaTRAK, setMetaTRAK] = useState<any>([]);
  const [results, setResults] = useState<any>([]);
  console.log(
    '🚀 ~ file: useTRAKTab.ts ~ line 15 ~ useTRAKTab ~ results',
    results,
  );

  const {handleGetState} = useLITELISTState();

  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;

  const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
  const index = client.initIndex('trx');
  console.log('🚀 ~ file: useTRAKTab.ts ~ line 16 ~ useTRAKTab ~ index', index);

  useEffect(() => {
    // console.log(
    //   '🚀 ~ file: useTRAKTab.ts ~ line 15 ~ useEffect ~ genius',
    //   genius,
    // );
    // alert(query);

    handleSearch(query);
  }, [query]);

  useEffect(() => {
    console.log(
      '🚀 ~ file: useTRAKTab.ts ~ line 36 ~ useEffect ~ metaTRAK',
      metaTRAK,
      trak,
    );
    // const test = metaTRAK.concat(trak);

    if (trak.length != 0) setResults(metaTRAK.concat(trak));
  }, [metaTRAK, trak]);

  const handleSearch = async (query: any) => {
    console.log(
      '🚀 ~ file: useTRAKTab.ts ~ line 29 ~ handleSearch ~ query',
      query,
    );

    const titleQuery = !query.split('-')[1] ? query : query.split('-')[1];

    // SEARCH
    index
      .search(titleQuery)
      .then(({hits}) => {
        console.log('🚀 ~ file: useTRAKTab.ts ~ line 22 ~ .then ~ hits', hits);
        // alert(1);
        console.log(hits);

        // SAVE TRX METAVERSE TRAK

        setMetaTRAK(hits);
      })
      .catch(err => {
        // alert(2);
        console.log(err);
      });
  };

  const handleTRAK = async (result: any) => {
    console.log(
      '🚀 ~ file: useTRAKTab.ts ~ line 92 ~ handleTRAK ~ result',
      result,
    );

    const isLocal =
      typeof result.protocol === 'string' || result.protocol instanceof String
        ? true
        : false;

    if (isLocal) {
      navigation.navigate('MODAL', {
        type: 'trak',
        exchange: {
          active: true,
          item: {...result.TRAK, isrc: result?.isrc},
        },
      });
    } else {
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
          featured_artists: song.featured_artists,
          producer_artists: song.producer_artists,
          song_relationships: song.song_relationships,
          // artist : get from genius FOR socials
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
          likes: [],
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
    }
  };
  return {
    metaTRAK,
    handleTRAK,
    results,
    TRXProfile,
    // handleDeposit,
    // handleGoBack,
    // isLoggedIn,
    // handleAuthentication,
  };
};
