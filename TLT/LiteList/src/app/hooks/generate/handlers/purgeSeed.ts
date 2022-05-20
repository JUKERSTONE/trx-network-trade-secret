// @ts-ignore
import AppleMusic from '@bouncyapp/react-native-apple-music';
import {useAPI, api} from '../../../../api';
import {useLITELISTState} from '../../../useLITELISTState';

import {generate} from '../handlers';
export const handlePurgeSeed = async ({seed, profileType}: any) => {
  const {SPOT: topTracks, AM: recommendation} = seed;
  const {useGET} = useAPI();
  const {handleGetState} = useLITELISTState();

  switch (profileType) {
    case 'primary':
      const filteredRecs = recommendation.filter((item: any) => {
        return !item.attributes.resourceTypes.includes('stations');
      });

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
              const album = await AppleMusic.getAlbum(id);

              return album[0];
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
        recommendationItems[luckyNumber1],
        recommendationItems[luckyNumber2],
      ];

      const recommendationsSeed = [
        ...recommendationsSlot[0].relationships.tracks.data,
        ...recommendationsSlot[1].relationships.tracks.data,
      ];

      const purgeAppleMusic = await Promise.all(
        recommendationsSeed.map(async (item: any) => {
          const keys = handleGetState({index: 'keys'});
          const accessToken = keys.spotify.accessToken;

          const isrc = item.attributes.isrc;

          const appleMusicMeta = {
            isrc: item.attributes.isrc,
            id: item.attributes.playParams.id,
            preview: item.attributes.previews[0].url,
            artist: item.attributes.artistName,
            title: item.attributes.name,
            cover_art: item.attributes.artwork.url,
          };

          const route = api.spotify({method: 'song_isrc', payload: {isrc}});
          return await useGET({route, token: accessToken})
            .then(response => {
              const spotifyResponse = response.data.tracks.items[0];

              const spotifyMeta = {
                isrc: spotifyResponse.external_ids.isrc,
                id: spotifyResponse.id,
                preview: spotifyResponse.preview_url,
                artist: spotifyResponse.artists[0].name,
                title: spotifyResponse.name,
                cover_art: spotifyResponse.album.images[0].url,
              };

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
        }),
      );

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

          return await AppleMusic.getSongWithIsrc(spotifyMeta.isrc)
            .then((item: any) => {
              const serialisedISRC = item;
              const song = JSON.parse(serialisedISRC).data[0];

              const appleMusicMeta = {
                isrc: song.attributes.isrc,
                id: song.attributes.playParams.id,
                preview: song.attributes.previews[0].url,
                artist: song.attributes.artistName,
                title: song.attributes.name,
                cover_art: song.attributes.artwork.url,
              };

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
    case 'spotify':
      const purgeSpotify1 = await Promise.all(
        topTracks.map(async (item: any) => {
          console.log(
            '🚀 ~ file: purgeSeed.ts ~ line 179 ~ topTracks.map ~ item',
            item,
          );
          const spotifyMeta = {
            isrc: item.external_ids.isrc,
            id: item.id,
            preview: item.preview_url,
            artist: item.artists[0].name,
            title: item.name,
            cover_art: item.album.images[0].url,
          };

          return {
            player: 'primary',
            artist: spotifyMeta.artist,
            title: spotifyMeta.title,
            cover_art: spotifyMeta.cover_art,
            isrc: spotifyMeta.isrc,
            web: {
              spotify: spotifyMeta,
              apple_music: null,
              genius: null,
              youtube: null,
              soundcloud: null,
            },
          };
        }),
      );
      return [...purgeSpotify1];
      break;
    case 'apple_music':
      break;
  }
};
