import React, {useState, Component} from 'react';
import {
  View,
  StatusBar,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Pressable,
} from 'react-native';
import {TRXPlayer, TRXHeaderPlayer} from '../elements';
import {TRXModalContainer} from '../containers';
import {store, handleMediaPlayerAction} from '../stores';
import {useLITELISTState} from '../app';
import {api} from '../api';
import axios from 'axios';
import {keys} from 'mobx';

export const LITELISTInterfaceHOC = (InnerComponent: any, mode: string) => {
  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? colors.dark.primary : colors.light.primary,
  // };

  return class TRXInterfaceHOC extends Component {
    constructor(props: any) {
      super(props);
      const {handleGetState} = useLITELISTState();
      const player = handleGetState({index: 'player'});
      const keys = handleGetState({index: 'keys'});
      console.log(
        '🚀 ~ file: LITELISTInterface.tsx ~ line 28 ~ TRXInterfaceHOC ~ constructor ~ keys',
        keys,
      );
      console.log(
        '🚀 ~ file: LITELISTInterface.tsx ~ line 21 ~ TRXInterfaceHOC ~ constructor ~ player',
        player,
      );
      this.state = {
        mode: player.mode,
        paused: player.paused,
        muted: player.muted,
        repeat: player.repeat,
        source: player.source,
        image: player.image,
        title: player.title,
        artist: player.artist,
        typing: false,
      };
    }

    handleMedia(type: string) {
      const action = handleMediaPlayerAction({playbackState: type});
      store.dispatch(action);
    }

    async handleControls({type, id, key, player, navigation}: any) {
      switch (type) {
        case 'save':
          const ids = id.spotify;
          const route = api.spotify({method: 'save-track', payload: {ids}});
          console.log(
            '🚀 ~ file: useSwipe.ts ~ line 83 ~ handleSwipedRight ~ route',
            route,
          );

          // alert(key);

          await axios
            .put(route, [ids], {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + key,
              },
            })
            .then(() => {
              alert(
                player.artist +
                  " - '" +
                  player.title +
                  "'\n - saved to Spotify -",
              );
            })
            .catch(err => {
              console.log(err, ' - track not saved');
            });

          // setTimeout(() => setSpotifyModal(false), 1000);
          break;
        case 'send':
          navigation.navigate('MMS');
          break;
        case 'fanclub':
          navigation.navigate('MODAL', {
            type: 'match-trak',
            exchange: {
              active: true,
              item: {
                title: player.title,
                artist: player.artist,
              },
            },
          });
          break;
        default:
          break;
      }
    }

    render() {
      return (
        <View style={[{flex: 1} /*backgroundStyle*/]}>
          <StatusBar barStyle={'dark-content'} />
          <View style={{flex: 1, justifyContent: 'space-between'}}>
            <View style={{flex: 1}}>
              <InnerComponent {...this.props} />
            </View>

            <TRXPlayer
              {...this.state}
              {...this.props}
              handleControls={this.handleControls}
              handleMedia={this.handleMedia}
              mode={mode}
            />
          </View>
        </View>
      );
    }
  };
};
