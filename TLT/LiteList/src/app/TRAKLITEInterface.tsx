import React, {useState, Component} from 'react';
import {View, StatusBar, Text, SafeAreaView} from 'react-native';
import {TRXPlayer, TRXHeaderPlayer} from '../elements';
import {TRXModalContainer} from '../containers';
import {store, handleMediaPlayerAction} from '../stores';
import {useLITELISTState} from '.';
import {TRAKLISTradio} from '../components';
import {Provider} from 'react-redux';

export const TRAKLITEInterfaceHOC = (InnerComponent: any) => {
  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? colors.dark.primary : colors.light.primary,
  // };

  return class TRXInterfaceHOC extends Component {
    constructor(props: any) {
      super(props);
    }

    handleMedia(type: string) {
      const action = handleMediaPlayerAction({playbackState: type});
      store.dispatch(action);
    }

    render() {
      return (
        <Provider store={store}>
          <InnerComponent {...this.props} />
        </Provider>
      );
    }
  };
};
