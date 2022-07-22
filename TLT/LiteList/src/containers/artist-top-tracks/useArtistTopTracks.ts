import React, {useEffect, useState, useContext} from 'react';
import {api, useAPI} from '../../api';
import {
  toggleTRAKRelationshipsView,
  store,
  handleMediaPlayerAction,
} from '../../stores';
import {useGenerate, useFirebase, useLITELISTState} from '../../app';
import {Alert} from 'react-native';

export const useArtistTopTracks = ({navigation, route}: any) => {
  console.log(
    '🚀 ~ file: useArtistTopTracks.ts ~ line 12 ~ useArtistTopTracks ~ navigation',
    navigation,
  );
  // const {handleGetState} = useLITELISTState();
  // const profile = handleGetState({index: 'profile'});
  // const TRXProfile = profile.TRX;
  // const userId = TRXProfile.id;
  // const trakName = TRXProfile.trak_name;

  // console.log('🚀 ~ file: useChat.ts ~ line 11 ~ useChat ~ route', route);
  // const {handleRetrieveChat, handleSubmitChat, handleRetrieveUser} =
  //   useFirebase();
  // const [chat, setChat] = useState<any>();
  // const [chatHistory, setChatHistory] = useState<any>();

  const handleTRAKNavigation = (item: any) => {
    console.log(
      '🚀 ~ file: useLandingRecommendations.ts ~ line 72 ~ handleTRAKNavigation ~ item',
      item,
    );
    Alert.alert(
      `${item.artists[0].name} - ${item.name}`,
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
            if (item.preview_url) {
              const action = handleMediaPlayerAction({
                playbackState: 'source',
                uri: item.preview_url,
                url: item.album.images[0].url,
                artist: item.artists[0].name,
                title: item.name,
                id: {
                  spotify: item.id,
                  apple_music: '',
                },
              });
              store.dispatch(action);
            } else
              alert(
                `Sorry. ${item.artists[0].name} didn't upload a preview for '${item.name}'`,
              );
          },
        },
        {
          text: 'FANCLUB',
          onPress: async () => {
            navigation.navigate('MODAL', {
              type: 'match-trak',
              exchange: {
                active: true,
                item: {
                  title: item.name,
                  artist: item.artists[0].name,
                },
              },
            });
          },
        },
      ],
    );
  };

  return {
    handleTRAKNavigation,
  };
};
