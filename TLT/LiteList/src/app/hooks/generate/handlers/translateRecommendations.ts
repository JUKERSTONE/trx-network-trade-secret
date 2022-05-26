// @ts-ignore
import AppleMusic from '@bouncyapp/react-native-apple-music';
import {useAPI, api} from '../../../../api';
import {useLITELISTState} from '../../../useLITELISTState';

import {generate} from '.';
export const handleTranslateRecommendations = async (
  recommendations: any,
  profileType: any,
) => {
  const {useGET} = useAPI();
  const {handleGetState} = useLITELISTState();

  const keys = handleGetState({index: 'keys'});
  const spotify = keys.spotify;
  const accessToken = spotify.accessToken;
  console.log(
    '🚀 ~ file: translateRecommendations.ts ~ line 17 ~ accessToken',
    accessToken,
  );
  console.log(
    '🚀 ~ file: purgeSeed.ts ~ line 9 ~ handlePurgeSeed ~ recommendation',
    recommendations,
  );

  switch (profileType) {
    case 'primary':
      const purgeSpotify = await Promise.all(
        recommendations.map(async (item: any) => {
          console.log(
            '🚀 ~ file: translateRecommendations.ts ~ line 22 ~ recommendations.map ~ item',
            item,
          );
          const route = api.spotify({method: 'get-artist', payload: 'item'});
          // get artist
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
                player: 'primary',
                artist: spotifyMeta.artist,
                title: spotifyMeta.title,
                cover_art: spotifyMeta.cover_art,
                spotify: spotifyMeta,
              };
            });
        }),
      );

      return purgeSpotify;
    case 'spotify':
      const purgeSpotify1 = await Promise.all(
        recommendations.map(async (item: any) => {
          const artistId = item.artists[0].id;
          const route = api.spotify({
            method: 'get-artist',
            payload: {artistId},
          });

          const artist = await useGET({route, token: accessToken})
            .then(res => {
              return res.data;
            })
            .catch(() => console.log('error'));

          const spotifyMeta = {
            isrc: item.external_ids.isrc,
            id: item.id,
            preview: item.preview_url,
            artist: item.artists[0].name,
            title: item.name,
            artist_art: artist.images[0].url,
            cover_art: item.album.images[0].url,
          };
          console.log(
            '🚀 ~ file: purgeSeed.ts ~ line 74 ~ recommendationsSeed.map ~ appleMusicMeta',
            spotifyMeta,
          );

          return {
            player: 'secondary:spotify',
            artist: spotifyMeta.artist,
            title: spotifyMeta.title,
            artist_art: spotifyMeta.artist_art,
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

      return purgeSpotify1;
    case 'apple_music':
      break;
  }
};
