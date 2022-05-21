import React from 'react';
import {
  View,
  FlatList,
  Button,
  ImageBackground,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {VHeader, Caption, Paragraph} from '../typography';
import LinearGradient from 'react-native-linear-gradient';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface TLandingRecommendations {
  recommendations: any;
  handleReload: () => void;
  // handleTrackNavigation: any;
}

export const LandingRecommendations: React.FC<TLandingRecommendations> = ({
  recommendations,
  handleReload,
  // handleTrackNavigation,
}) => {
  console.log(
    '🚀 ~ file: LandingRecommendations.tsx ~ line 27 ~ recommendations',
    recommendations,
  );
  dayjs.extend(relativeTime);

  const renderItem = ({item}: any) => {
    console.log(
      '🚀 ~ file: LandingRecommendations.tsx ~ line 34 ~ renderItem ~ item',
      item,
    );

    return (
      // <Pressable onPress={() => handleTrackNavigation(spotifyData)}>
      <View style={{justifyContent: 'space-between', margin: 5}}>
        <Image
          source={{uri: item?.cover_art}}
          style={{
            backgroundColor: '#fff',
            borderRadius: 8,
            height: 200,
            width: '100%',
            justifyContent: 'flex-end',
          }}
        />
        <View
          style={{
            marginTop: 2,
            padding: 10,
            alignItems: 'center',
          }}>
          <VHeader
            type="four"
            color="whitesmoke"
            text={item?.title}
            numberOfLines={1}
          />
          <Paragraph
            type="two"
            color="#cececece"
            text={item?.artist}
            numberOfLines={1}
          />
        </View>
      </View>
      // </Pressable>
    );
  };
  return (
    // Within your render function
    <LinearGradient colors={['#1B3926', '#1A1A1A', '#1B3926', '#1A1A1A']}>
      <View style={{marginLeft: 15}}>
        <View
          style={{
            justifyContent: 'center',
            marginTop: 5,
          }}>
          <View
            style={{
              alignSelf: 'flex-end',

              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
              // width: '50%',
              backgroundColor: 'yellow',
              padding: 10,
              paddingVertical: 15,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              flexDirection: 'row',
            }}>
            <View
              style={{
                marginRight: 10,
                backgroundColor: '#1a1a1a',
                borderRadius: 20,
                padding: 4,
              }}>
              <MaterialIcons name="trending-up" size={20} color={'#fff'} />
            </View>
            <VHeader
              type="four"
              color="#1a1a1a"
              text={'RECOMMENDED FOR YOU.'}
            />
          </View>
          {recommendations ? (
            <FlatList
              data={recommendations}
              renderItem={renderItem}
              horizontal={true}
              // showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => '' + index}
              listKey="Recomendations"
            />
          ) : (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 20,
              }}>
              <ActivityIndicator size="large" color="#00ff00" />
              <Button title="reload" onPress={handleReload} />
            </View>
          )}
        </View>
      </View>
    </LinearGradient>
  );
};
