import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Pressable,
  Image,
  ActivityIndicator,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useSelector} from 'react-redux';

interface TSwipeCard {
  // card: any;
  handleNavigateTrack: any;
  recommendation: any;
  recommendations: any;
  index: any;
  handleSetPlayer: any;
  size: any;
  handleLoadRecommendations: any;
}

export const SwipeCard: React.FC<TSwipeCard> = ({
  // card,
  recommendation,
  recommendations,
  index,
  handleSetPlayer,
  size,
  handleLoadRecommendations,
  // handleNavigateTrack,
}) => {
  console.log(
    '🚀 ~ file: SwipeCard.tsx ~ line 34 ~ recommendations',
    recommendations,
  );
  console.log();
  if (index > size - 4) {
    handleLoadRecommendations();
  }
  const [cardIndex, setCardIndex] = useState(0);

  const player = useSelector((state: any) => state.player);

  const card = recommendations[index === 0 ? 0 : index - 1];
  console.log('🚀 ~ file: SwipeCard.tsx ~ line 40 ~ card', card);
  if (card) {
    // handleSetPlayer(card);

    return (
      <View style={{alignSelf: 'center'}}>
        <Animatable.View animation={'bounceIn'}>
          <ImageBackground
            source={{
              uri: !player.hidden
                ? player?.players?.spotify?.item?.album?.images[0]?.url
                : recommendations[index].cover_art,
            }}
            style={[
              styles.card,
              {
                // position: 'absolute',
                // top: 0,
                justifyContent: 'flex-end',
              },
            ]}
            imageStyle={{
              borderRadius: 25,
            }}>
            <View
              style={{
                height: 60,
                // justifyContent: 'flex-end',
                backgroundColor: '#fff',
                // paddingVertical: 5,
                padding: 5,
                opacity: 0.9,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'flex-end',
                alignSelf: 'flex-end',
                marginBottom: 7,
                marginRight: 7,
              }}>
              <Image
                style={{height: 50, width: 50, borderRadius: 15}}
                source={{uri: recommendations[index].artist_art}}
              />
            </View>
          </ImageBackground>
        </Animatable.View>
      </View>
    );
  } else return <ActivityIndicator size="large" color="#1a1a1a" />;
};

const styles = StyleSheet.create({
  container: {},
  card: {
    height: 350,
    width: 300,
    // borderRadius: 25,
    // marginTop: 20,
  },
});
