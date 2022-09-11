import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  useWindowDimensions,
  ActivityIndicator,
  Dimensions,
  Button,
  SafeAreaView,
} from 'react-native';
// import {AlphabetList} from 'react-native-section-alphabet-list';
import {VHeader, Body} from '../typography';
import {TabView, TabBar} from 'react-native-tab-view';
import {colors} from '../../core';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {WebView} from 'react-native-webview';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const LastPlayedElement = ({}: any) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'second', title: 'TOP TRACKS'},
    {key: 'fourth', title: 'TOP ARTISTS'},
    {key: 'third', title: 'PLAYLISTS'},
  ]);

  return (
    <SafeAreaView style={{backgroundColor: '#333333', flex: 1}}>
      <Text>BE REAL</Text>
    </SafeAreaView>
  );
};
