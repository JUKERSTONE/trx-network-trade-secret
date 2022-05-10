// @ts-ignore
import AppleMusic from '@bouncyapp/react-native-apple-music';
import {useAPI, api} from '../../../../api';
import {useLITELISTState} from '../../../useLITELISTState';

import {generate} from '../handlers';
export const handlePurgeSeed = async ({seed}: any) => {
  const {SPOT: topTracks, AM: recommendation} = seed;
  const {useGET} = useAPI();
  const {handleGetState} = useLITELISTState();
  console.log(
    '🚀 ~ file: purgeSeed.ts ~ line 9 ~ handlePurgeSeed ~ recommendation',
    recommendation,
  );

  const filteredRecs = recommendation.filter((item: any) => {
    return !item.attributes.resourceTypes.includes('stations');
  });
  console.log(
    '🚀 ~ file: purgeSeed.ts ~ line 18 ~ filteredRecs ~ filteredRecs',
    filteredRecs,
  );

  const magicNumbers = generate(filteredRecs);

  const magicNumber = magicNumbers[1];

  const magicSeed = filteredRecs[magicNumber];

  const appleMusicSeed = magicSeed.relationships.contents.data;

  const recommendationItems = await Promise.all(
    appleMusicSeed.map(async (item: any) => {
      const id = item.id;
      const type = item.type;

      switch (type) {
        case 'albums':
          return AppleMusic.getAlbum(id);
        case 'playlists':
          const serializedPlaylist = await AppleMusic.getPlaylist(id);
          const playlist = JSON.parse(serializedPlaylist).data[0];
          return playlist;
        default:
          break;
      }
    }),
  );

  const luckyNumbers = generate(recommendationItems);

  const luckyNumber1 = luckyNumbers[0];
  const luckyNumber2 = luckyNumbers[2];

  const recommendationsSlot = [
    ...recommendationItems[luckyNumber1],
    ...recommendationItems[luckyNumber2],
  ];

  const recommendationsSeed = [
    ...recommendationsSlot[0].relationships.tracks.data,
    ...recommendationsSlot[1].relationships.tracks.data,
  ];
  console.log(
    '🚀 ~ file: purgeSeed.ts ~ line 63 ~ handlePurgeSeed ~ recommendationsSeed',
    recommendationsSeed,
  );

  // candidates for trak purge

  const purgeCandidates = {
    spotify: topTracks,
    apple_music: recommendationsSeed,
  };

  const purgeAppleMusic = await Promise.all(
    recommendationsSeed.map(async (item: any) => {
      console.log(
        '🚀 ~ file: purgeSeed.ts ~ line 51 ~ recommendationsSeed.map ~ item',
        item.attributes,
      );

      const keys = handleGetState({index: 'keys'});
      const accessToken = keys.spotify.accessToken;
      console.log(
        '🚀 ~ file: purgeSeed.ts ~ line 63 ~ recommendationsSeed.map ~ accessToken',
        accessToken,
      );

      const isrc = item.attributes.isrc;

      const appleMusicMeta = {
        isrc: item.attributes.isrc,
        id: item.attributes.playParams.id,
        preview: item.attributes.previews[0].url,
        artist: item.attributes.artistName,
        title: item.attributes.name,
        cover_art: item.attributes.artwork.url,
      };
      console.log(
        '🚀 ~ file: purgeSeed.ts ~ line 74 ~ recommendationsSeed.map ~ appleMusicMeta',
        appleMusicMeta,
      );

      const route = api.spotify({method: 'song_isrc', payload: {isrc}});
      return await useGET({route, token: accessToken})
        .then(response => {
          const spotifyResponse = response.data.tracks.items[0];
          console.log(
            '🚀 ~ file: purgeSeed.ts ~ line 69 ~ purge ~ spotifyResponse',
            spotifyResponse,
          );

          const spotifyMeta = {
            isrc: spotifyResponse.external_ids.isrc,
            id: spotifyResponse.id,
            preview: spotifyResponse.preview_url,
            artist: spotifyResponse.artists[0].name,
            title: spotifyResponse.name,
            cover_art: spotifyResponse.album.images[0].url,
          };
          console.log(
            '🚀 ~ file: purgeSeed.ts ~ line 100 ~ recommendationsSeed.map ~ spotifyMeta',
            spotifyMeta,
          );

          if (!spotifyResponse)
            return {
              player: 'secondary',
              service: 'apple_music',
            };
          return {
            player: 'primary',
            artist: spotifyMeta.artist,
            title: spotifyMeta.title,
            cover_art: spotifyMeta.cover_art,
            isrc,
            web: {
              spotify: spotifyMeta,
              apple_music: appleMusicMeta,
              genius: null,
              youtube: null,
              soundcloud: null,
            },
          };
        })
        .catch((err: any) => {
          return {
            player: 'secondary:apple_music',
            artist: appleMusicMeta.artist,
            title: appleMusicMeta.title,
            cover_art: appleMusicMeta.cover_art,
            apple_music: appleMusicMeta,
          };
        });

      // if(spotifyResponse.)
    }),
  );
  console.log(
    '🚀 ~ file: purgeSeed.ts ~ line 135 ~ handlePurgeSeed ~ purgeAppleMusic',
    purgeAppleMusic,
  );
  // console.log('🚀 ~ file: purgeSeed.ts ~ line 72 ~ purge ~ purge', purge);

  // choose 3 arrays

  // convert AM to spotify using isrc
  // get spotify item using isrc
  // return these to primary
  // return else to secondary

  const purgeSpotify = await Promise.all(
    topTracks.map(async (item: any) => {
      const spotifyMeta = {
        isrc: item.external_ids.isrc,
        id: item.id,
        preview: item.preview_url,
        artist: item.artists[0].name,
        title: item.name,
        cover_art: item.album.images[0].url,
      };
      console.log(
        '🚀 ~ file: purgeSeed.ts ~ line 74 ~ recommendationsSeed.map ~ appleMusicMeta',
        spotifyMeta,
      );

      return await AppleMusic.getSongWithIsrc(spotifyMeta.isrc)
        .then((item: any) => {
          console.log(
            '🚀 ~ file: purgeSeed.ts ~ line 187 ~ .then ~ item',
            item,
          );

          const serialisedISRC = item;
          const song = JSON.parse(serialisedISRC).data[0];
          console.log(
            '🚀 ~ file: purgeSeed.ts ~ line 194 ~ .then ~ playlist',
            song,
          );
          const appleMusicMeta = {
            isrc: song.attributes.isrc,
            id: song.attributes.playParams.id,
            preview: song.attributes.previews[0].url,
            artist: song.attributes.artistName,
            title: song.attributes.name,
            cover_art: song.attributes.artwork.url,
          };
          console.log(
            '🚀 ~ file: purgeSeed.ts ~ line 206 ~ .then ~ appleMusicMeta',
            appleMusicMeta,
          );

          return {
            player: 'primary',
            artist: spotifyMeta.artist,
            title: spotifyMeta.title,
            cover_art: spotifyMeta.cover_art,
            isrc: spotifyMeta.isrc,
            web: {
              spotify: spotifyMeta,
              apple_music: appleMusicMeta,
              genius: null,
              youtube: null,
              soundcloud: null,
            },
          };
        })
        .catch((err: any) => {
          console.log(
            '🚀 ~ file: purgeSeed.ts ~ line 189 ~ awaitAppleMusic.getSongWithIsrc ~ err',
            err,
          );
          return {
            player: 'secondary:spotify',
            artist: spotifyMeta.artist,
            title: spotifyMeta.title,
            cover_art: spotifyMeta.cover_art,
            spotify: spotifyMeta,
          };
        });
    }),
  );

  return [...purgeSpotify, ...purgeAppleMusic];
};
