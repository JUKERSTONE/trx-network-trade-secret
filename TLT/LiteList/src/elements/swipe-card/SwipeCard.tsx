import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
// import { Loading } from "../loading";
// import { SwipeAdvert } from "../swipe-advert";

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
  if (index > size - 4) {
    handleLoadRecommendations();
  }
  console.log('🚀 ~ file: SwipeCard.tsx ~ line 27 ~ index', index);
  console.log(
    '🚀 ~ file: SwipeCard.tsx ~ line 27 ~ recommendations',
    recommendations,
  );
  const [cardIndex, setCardIndex] = useState(0);
  if (recommendations[index]) {
    console.log(
      '🚀 ~ file: SwipeCard.tsx ~ line 55 ~ recommendations[index]',
      recommendations[index],
    );
    console.log('🚀 ~ file: SwipeCard.tsx ~ line 55 ~ index', index);
    handleSetPlayer(recommendations, index === 0 ? 0 : index - 1);

    return (
      <>
        <Animatable.View animation={'bounceIn'}>
          <ImageBackground
            source={{uri: recommendations[index].cover_art}}
            style={[styles.card, {position: 'absolute', top: 0}]}
            imageStyle={{
              borderRadius: 25,
            }}>
            {/*  */}
            {/*  */}
            <View style={{padding: 20}}>
              <View
                style={{
                  width: 40,
                  height: 15,
                  borderRadius: 5,
                  marginBottom: 10,
                  backgroundColor: cardIndex === 0 ? '#fff' : '#292929',
                  borderColor: 'green',
                  borderWidth: 2,
                }}></View>
              <View
                style={{
                  width: 40,
                  height: 15,
                  borderRadius: 5,
                  marginBottom: 10,
                  backgroundColor: cardIndex !== 0 ? '#fff' : '#292929',
                  borderColor: 'green',
                  borderWidth: 2,
                }}></View>
            </View>
          </ImageBackground>
        </Animatable.View>
      </>
    );
  } else return <ActivityIndicator size="large" color="#1a1a1a" />;
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
  },
  card: {
    // flex: 0.85,
    alignSelf: 'center',
    height: 400,
    width: '100%',
    borderRadius: 25,
    marginTop: 20,
  },
});
