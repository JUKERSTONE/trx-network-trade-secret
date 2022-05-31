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
  console.log();
  if (index > size - 4) {
    handleLoadRecommendations();
  }
  const [cardIndex, setCardIndex] = useState(0);

  const card = recommendations[index === 0 ? 0 : index - 1];
  console.log('🚀 ~ file: SwipeCard.tsx ~ line 40 ~ card', card);
  if (card) {
    handleSetPlayer(card);

    return (
      <>
        <Animatable.View animation={'bounceIn'}>
          <ImageBackground
            source={{uri: recommendations[index].cover_art}}
            style={[
              styles.card,
              {
                position: 'absolute',
                top: 0,
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
      </>
    );
  } else return <ActivityIndicator size="large" color="#1a1a1a" />;
};

const styles = StyleSheet.create({
  container: {},
  card: {
    alignSelf: 'center',
    height: 400,
    width: '100%',
    borderRadius: 25,
    marginTop: 20,
  },
});
