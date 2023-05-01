import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Button,
  useWindowDimensions,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
  TouchableHighlight,
} from 'react-native';
import {useSelector} from 'react-redux';
import {WebView} from 'react-native-webview';
import {TRAKCard} from '../trak-card/TRAKCard';
export const RSSComplexElement = ({handleNavigateWebsite, route}: any) => {
  const complexRSS = useSelector((state: any) => state.rss.complex);

  return complexRSS.map((item: any) => (
    <TouchableHighlight onPress={() => handleNavigateWebsite(item.id)}>
      <TRAKCard
        // rank={++index}
        artwork={item.enclosures[0].url}
        title={item.description}
        artist={item.title}
        nolTitle={6}
        nolArtist={5}
        width={90}
        height={'100%'}
      />
    </TouchableHighlight>
  ));
};
