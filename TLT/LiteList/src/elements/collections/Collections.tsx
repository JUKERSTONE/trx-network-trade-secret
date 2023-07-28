import React, {FC} from 'react';
import {
  View,
  TouchableOpacity,
  useWindowDimensions,
  ImageBackground,
  Image,
  Pressable,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Carousel from 'react-native-snap-carousel';
import {Caption, VHeader} from '../typography';

export const CollectionsElement = ({
  data = ['data', 'fee', 'ferwfer'],
  headerText = 'Explore TRAKSTAR collections...',
  height = 200,
  itemWidth = 200,
  onPress,
}: any) => {
  const {width} = useWindowDimensions();

  const _renderItem = ({item, index}: any) => (
    <Pressable onPress={onPress}>
      <Image
        source={{uri: item.uri}}
        style={{
          backgroundColor: '#1db954',
          height,
          borderRadius: 10,
          flex: 1,
        }}
      />
      <Caption type="two" color={'#fff'} text={item.captionTop} />
      <Caption type="two" color={'#fff'} text={item.captionBottom} />
    </Pressable>
  );

  return (
    <View style={{padding: 10}}>
      <Carousel
        // layout={'stack'}
        // layoutCardOffset={0}
        // data={data}
        data={data}
        renderItem={_renderItem}
        sliderWidth={width}
        itemWidth={itemWidth}
      />
    </View>
  );
};
