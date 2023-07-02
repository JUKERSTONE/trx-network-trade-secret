import React, {FC, useState} from 'react';
import {
  View,
  TouchableOpacity,
  useWindowDimensions,
  FlatList,
  Image,
  Pressable,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Carousel from 'react-native-snap-carousel';
import {Caption, Paragraph, VHeader} from '../typography';

export const HorizontalCategoriesElement = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: any) => {
  return (
    <FlatList
      data={categories}
      horizontal={true}
      // keyExtractor={category => category.id}
      // onScrollToIndexFailed={onScrollToIndexFailed}
      showsHorizontalScrollIndicator={false}
      // ref={flatListRef}
      style={{backgroundColor: '#cecece', padding: 8}}
      renderItem={({item, index}) => (
        <Pressable onPress={() => setSelectedCategory({category: item, index})}>
          <View
            style={{
              marginHorizontal: 10,
              backgroundColor:
                selectedCategory.category === item ? '#1a1a1a' : 'transparent',
              padding: 5,
              borderRadius: 5,
            }}>
            <Caption
              type="two"
              color={selectedCategory.category === item ? '#fff' : '#1a1a1a'}
              text={item}
            />
          </View>
        </Pressable>
      )}
    />
  );
};
