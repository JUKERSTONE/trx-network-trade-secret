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
  if (recommendations[index]) {
    handleSetPlayer(recommendations, index === 0 ? 0 : index - 1);
    // const cardData = [
    //   {
    //     id: 0,
    //     image: recommendations[index].cover_art,
    //   },
    //   {
    //     id: 1,
    //     image: recommendations[index].artist_art,
    //   },
    // ];
    return (
      <>
        <Animatable.View animation={'bounceIn'}>
          <ImageBackground
            // source={{uri: cardData[cardIndex].image}}
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
          {/* <View
            style={[
              styles.card,
              {
                backgroundColor: 'transparent',
                flexDirection: 'row',
              },
            ]}>
            <Pressable
              onPress={() => {
                // const ids = {
                //   track: recommendations[index].cover_art,
                //   artist: recommendations[index].artist_art,
                // };
                // console.log('🚀 ~ file: index.tsx ~ line 72 ~ ids', ids);
                // handleNavigateTrack(ids);
                cardIndex > 0 ? setCardIndex(cardIndex - 1) : null;
              }}
              style={{flex: 1, backgroundColor: 'transparent'}}>
              <View></View>
            </Pressable>

            <Pressable
              onPress={() =>
                cardIndex < 1 ? setCardIndex(cardIndex + 1) : null
              }
              style={{flex: 1, backgroundColor: 'transparent'}}>
              <View></View>
            </Pressable>
          </View> */}
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
