import React, {useState, Component} from 'react';
import {View, StatusBar, Text, SafeAreaView} from 'react-native';
import {TRXPlayer, TRXHeaderPlayer} from '../elements';
import {TRXModalContainer} from '../containers';
import {store, handleMediaPlayerAction} from '../stores';
import {useLITELISTState} from '../app';

export const LITELISTInterfaceHOC = (InnerComponent: any, mode: string) => {
  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? colors.dark.primary : colors.light.primary,
  // };

  return class TRXInterfaceHOC extends Component {
    constructor(props: any) {
      super(props);
      const {handleGetState} = useLITELISTState();
      const player = handleGetState({index: 'player'});
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
      };
    }

    handleMedia(type: string) {
      const action = handleMediaPlayerAction({playbackState: type});
      store.dispatch(action);
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
              handleMedia={this.handleMedia}
              mode={mode}
            />
          </View>
        </View>
      );
    }
  };
};
