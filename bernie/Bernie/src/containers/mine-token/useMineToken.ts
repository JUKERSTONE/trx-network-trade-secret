import React, {useEffect, useState, useContext} from 'react';
import {useAPI, APIKeys, routes} from '../../api';
import {useBERNIEState} from '../../app';

export const useMineToken = () => {
  const [query, setQuery] = useState<any>(null);
  const [TRAK, setTRAK] = useState<any>({});
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [TRAKCollection, setTRAKCollection] = useState<any>([]);
  const [seed, setSeed] = useState<any>();
  const {GET, POST} = useAPI();
  const handleInputChange = (text: string) => {
    setQuery(text);
  };

  useEffect(() => {
    console.log(
      '🚀 ~ file: useMineToken.ts ~ line 15 ~ useMineToken ~ TRAK',
      TRAK,
    );

    setTRAKCollection([...TRAKCollection, TRAK]);
  }, [TRAK]);

  useEffect(() => {
    console.log(
      '🚀 ~ file: useMineToken.ts ~ line 25 ~ useMineToken ~ TRAKCollection',
      TRAKCollection,
    );
  }, [TRAKCollection]);

  const handleAction = () => {
    setTRAKCollection([]);
    const route = routes.genius({method: 'search', payload: {query}});
    const token = APIKeys.genius.accessToken;

    const response = GET({route, token});

    Promise.resolve(response)
      .then(res => {
        const geniusHits = res.data.response.hits;
        return geniusHits;
      })
      .then((geniusHits: any) => {
        geniusHits.map((hit: any) => {
          const geniusId = hit.result.id;

          const route = routes.genius({method: 'songs', payload: {geniusId}});

          const response = GET({route, token});

          Promise.resolve(response).then(res => {
            const song = res.data.response.song;
            console.log(
              '🚀 ~ file: useMineToken.ts ~ line 50 ~ Promise.resolve ~ song',
              song,
            );
            /** BEHIND THE TRAK
             * custom_performances
             * description
             * recording_location
             * writer_artists
             * producer_artists
             * song_relationships
             */

            const meta = {
              artist: song.artist_names,
              title: song.title,
              genius_url: song.url,
              release_date: song.release_date,
              description: song.description,
              custom_performances: song.custom_performances,
              recording_location: song.recording_location,
              writer_artists: song.writer_artists,
              producer_artists: song.producer_artists,
              song_relationships: song.song_relationships,
              thumbnail: song.song_art_image_thumbnail_url,
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
            const apple_music = hasAppleMusic
              ? {id: song.apple_music_id}
              : null;

            if (hasAppleMusic) {
              centralized.push('apple_music');
              // missingCentralized.splice(0, 1);
            }

            let trak: any = {
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

            setTRAK({
              trak,
              meta,
              missingProviders,
            });
          });
        });
      });
  };

  const handleSeed = ({item}: any) => {
    setSeed(item);
    //
    //
    setModalVisible(true);
  };

  const handleMintTRAK = ({seed}: any) => {
    const {handleGetState} = useBERNIEState();

    const isPrimaryTRAK = seed.trak.spotify ? true : false;

    switch (isPrimaryTRAK) {
      case true:
        const spotifyURI = seed.trak.spotify.uri;
        const id = spotifyURI.split(':')[2];
        const route = routes.spotify({method: 'track', payload: {id}});
        const state = handleGetState({index: 'keys'});

        const token = state.spotify.bernie.access_token;

        const response = GET({route, token});

        Promise.resolve(response).then(res => {
          const data = res.data;

          const TRAKProps = {
            isrc: data.external_ids.isrc,
            type: 'track',
            isNFT: false,
            currency: 'TRX',
            spotify: seed.trak.spotify,
            genius: seed.track?.genius,
            apple_music: seed.track?.apple_music,
            youtube: seed.track?.youtube,
            soundcloud: seed.track?.soundcloud,
          };

          console.log(
            '🚀 ~ file: useMineToken.ts ~ line 209 ~ Promise.resolve ~ TRAKProps',
            TRAKProps,
          );

          const route = routes.bernie({method: 'set_trak'});
          const response = POST({
            route,
            token: null,
            body: TRAKProps,
            ContentType: 'application/json',
          });

          console.log(
            '🚀 ~ file: useMineToken.ts ~ line 198 ~ Promise.resolve ~ route',
            response,
          );

          Promise.resolve(response).then((res: any) => {
            //
            const data = res.data;
            const {success, trakToken} = data;
            console.log(
              '🚀 ~ file: useMineToken.ts ~ line 218 ~ Promise.resolve ~ success, trakToken',
              success,
              trakToken,
            );
            //
          });
        });
        break;
      case false:
        alert('Cannot mint a non-primary TRAK');
        break;
    }

    const {trak, meta} = seed;

    const {
      artist,
      description,
      genius_url,
      producer_artists,
      recording_location,
      release_date,
      song_relationships,
      thumbnail,
    } = meta;

    const {apple_music, genius, spotify, youtube} = trak;
  };

  return {
    handleInputChange,
    handleAction,
    TRAKCollection,
    modalVisible,
    setModalVisible,
    handleMintTRAK,
    handleSeed,
    seed,
    setSeed,
  };
};
