import React, {useEffect, useState, useContext} from 'react';
import {Alert} from 'react-native';

import {api, useAPI} from '../../api';
import {store, handleMediaPlayerAction} from '../../stores';

export const usePlaylist = ({navigation, route}: any) => {
  const [TRAK, setTRAK] = useState();
  const {useGET} = useAPI();

  useEffect(() => {
    //
  }, []);

  const handleNavigateTRAK = (item: any) => {
    console.log(
      '🚀 ~ file: useTape.ts ~ line 16 ~ handleNavigateTRAK ~ item',
      item,
    );
    Alert.alert(
      `${item.track.artists[0].name} - ${item.track.name}`,
      `What would you like to do?`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Preview',
          onPress: async () => {
            if (item.track.preview_url) {
              const action = handleMediaPlayerAction({
                playbackState: 'source',
                uri: item.track.preview_url,
                url: item.track.album.images[0].url,
                artist: item.track.artists[0].name,
                title: item.track.name,
                id: {
                  spotify: item.track.id,
                  apple_music: '',
                },
              });
              store.dispatch(action);
            } else {
              alert(
                `Sorry. ${item.track.artists[0].name} didn't upload a preview for '${item.track.name}'`,
              );
            }
          },
        },
        {
          text: 'GENIUS',
          onPress: async () => {
            navigation.navigate('MODAL', {
              type: 'match-trak',
              exchange: {
                active: true,
                item: {
                  title: item.track.name,
                  artist: item.track.artists[0].name,
                },
              },
            });
          },
        },
      ],
    );
  };

  return {
    handleNavigateTRAK,
  };
};
