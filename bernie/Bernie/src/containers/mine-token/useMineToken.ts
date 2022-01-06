import React, {useEffect, useState, useContext} from 'react';
import {useAPI, APIKeys, routes} from '../../api';
import {useBERNIEState} from '../../app';

export const useMineToken = () => {
  const [query, setQuery] = useState<any>(null);
  const [TRAK, setTRAK] = useState<any>({});
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [TRAKCollection, setTRAKCollection] = useState<any>([]);
  const [seed, setSeed] = useState<any>();
  const [isRare, setIsRare] = useState<boolean>(false);
  const [selectedValueLabel, setSelectedValueLabel] = useState('standard');
  const [selectedValueTier, setSelectedValueTier] = useState('tier_4');
  const [mintLoading, setMintLoading] = useState(false);
  const [spotifyID, setSpotifyID] = useState<any>(null);
  const [appleMusicID, setAppleMusicID] = useState<any>(null);
  const [youTubeID, setYouTubeID] = useState<any>(null);
  const [soundcloudID, setSoundcloudID] = useState<any>(null);

  const {GET, POST} = useAPI();

  useEffect(() => {
    setTRAKCollection([...TRAKCollection, TRAK]);
  }, [TRAK]);

  useEffect(() => {
    console.log(
      '🚀 ~ file: useMineToken.ts ~ line 25 ~ useMineToken ~ TRAKCollection',
      TRAKCollection,
    );
  }, [TRAKCollection]);

  const handleInputChange = (text: string) => {
    setQuery(text);
  };

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
              trak_label: selectedValueLabel,
              is_rare: isRare,
              tier: selectedValueTier,
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
    setModalVisible(true);
  };

  const handleMintTRAK = ({seed}: any) => {
    setMintLoading(true);
    const {handleGetState} = useBERNIEState();
    const {trak, meta} = seed;
    const isPrimaryTRAK = seed.trak.spotify || spotifyID ? true : false;

    switch (isPrimaryTRAK) {
      case true:
        const spotifyURI = seed.trak.spotify?.uri;
        const id = spotifyID ? spotifyID.id : spotifyURI.split(':')[2];
        const route = routes.spotify({method: 'track', payload: {id}});
        const state = handleGetState({index: 'keys'});

        const token = state.spotify.bernie.access_token;

        const response = GET({route, token});

        Promise.resolve(response).then(res => {
          const data = res.data;

          const TRAKProps = {
            isrc: data.external_ids.isrc,
            isPrimaryTRAK: true,
            type: 'track',
            isNFT: false,
            currency: 'TRX',
            spotify: spotifyID ? spotifyID : seed.trak.spotify,
            genius: seed.trak?.genius,
            apple_music: appleMusicID ? appleMusicID : seed.trak?.apple_music,
            youtube: youTubeID ? youTubeID : seed.trak?.youtube,
            soundcloud: soundcloudID ? soundcloudID : seed.trak?.soundcloud,
            meta,
          };

          const route = routes.bernie({method: 'set_trak'});
          const response = POST({
            route,
            token: null,
            body: TRAKProps,
            ContentType: 'application/json',
          });

          Promise.resolve(response).then((res: any) => {
            const data = res.data;
            const {success, trakToken} = data;

            setMintLoading(false);
            if (success) {
              alert('PRIMARY TRAK minted');
            }
          });
        });
        break;
      case false:
        const TRAKProps = {
          isrc: null,
          isPrimaryTRAK: false,
          type: 'track',
          isNFT: false,
          currency: 'TRX',
          spotify: spotifyID ? spotifyID : seed.trak.spotify,
          genius: seed.trak?.genius,
          apple_music: appleMusicID ? appleMusicID : seed.trak?.apple_music,
          youtube: youTubeID ? youTubeID : seed.trak?.youtube,
          soundcloud: soundcloudID ? soundcloudID : seed.trak?.soundcloud,
          meta,
        };

        const secondaryTRAKRoute = routes.bernie({method: 'set_trak'});

        const secondaryTRAKResponse = POST({
          route: secondaryTRAKRoute,
          token: null,
          body: TRAKProps,
          ContentType: 'application/json',
        });

        Promise.resolve(secondaryTRAKResponse).then((res: any) => {
          const data = res.data;
          const {success, trakToken} = data;

          setMintLoading(false);
          if (success) {
            alert('SECONDARY minted');
          } else alert('Cannot mint a non-primary TRAK');
        });
        break;
    }
  };

  const handleIDChange = ({text, provider}: any) => {
    switch (provider) {
      case 'spotify':
        setSpotifyID({id: text});
        break;
      case 'apple_music':
        setAppleMusicID({id: text});
        break;
      case 'youtube':
        setYouTubeID({id: text});
        break;
      case 'soundcloud':
        setSoundcloudID({id: text});
        break;
    }
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
    setIsRare,
    isRare,
    selectedValueLabel,
    setSelectedValueLabel,
    selectedValueTier,
    setSelectedValueTier,
    mintLoading,
    handleIDChange,
  };
};
