import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useSelector} from 'react-redux';
import {
  initConnection,
  getSubscriptions,
  RequestSubscription,
  requestSubscription,
} from 'react-native-iap';

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
  const player = useSelector((state: any) => state.player);
  const profile = useSelector((state: any) => state.profile.TRX);
  const [loading, setLoading] = useState(true);

  console.log(
    '🚀 ~ file: SwipeCard.tsx ~ line 34 ~ recommendations',
    recommendations,
  );
  useEffect(() => {
    if (index > size - 4) {
      if (profile.userPackage) {
        handleLoadRecommendations();
      } else
        Alert.alert(
          `Upgrade to MUSICHEAD subscription`,
          `Upgrade to find more music...`,
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'Upgrade',
              onPress: async () => {
                setLoading(true);
                const packageId = 'com.bernie.tlt.trakstar1m';

                await initConnection();
                const subscriptions = await getSubscriptions({
                  skus: packageId,
                });
                console.log(
                  '🚀 ~ file: usePayWall.ts:125 ~ handleSubscribe ~ subscriptions:',
                  subscriptions,
                );
                let requestPayload: any = {sku: packageId}; // for ios
                if (Platform.OS === 'android')
                  requestPayload = {
                    // maybe we need to set offerToken from values inside selectedSubscription on line 134
                    subscriptionOffers: [{sku: packageId, offerToken: ''}],
                  };
                console.log({requestPayload});
                const purchase: any = await requestSubscription({
                  sku: subscriptions[0].productId,
                });
                setLoading(false);
              },
            },
          ],
        );
    }
  }, [index]);

  const [cardIndex, setCardIndex] = useState(0);

  const card = recommendations[index === 0 ? 0 : index - 1];
  console.log('🚀 ~ file: SwipeCard.tsx ~ line 40 ~ card', card);
  if (card) {
    // handleSetPlayer(card);

    return (
      <Animatable.View
        animation={'bounceIn'}
        style={{borderWidth: 1, borderColor: '#cecece'}}>
        <ImageBackground
          source={{
            uri: !player.hidden
              ? player?.players?.spotify?.item?.album?.images[0]?.url
              : recommendations[index].cover_art,
          }}
          style={{
            height: 320,
            width: Dimensions.get('screen').width,
            justifyContent: 'flex-end',
          }}
          imageStyle={{
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          <Image
            style={{
              height: 43,
              width: 55,
              borderRadius: 10,
              alignSelf: 'flex-end',
              margin: 10,
              borderWidth: 2,
              borderColor: '#cecece',
            }}
            source={{
              uri:
                player?.players?.spotify?.item && !player.hidden
                  ? recommendations[index].cover_art
                  : recommendations[index].artist_art,
            }}
          />
        </ImageBackground>
      </Animatable.View>
    );
  } else return <ActivityIndicator size="large" color="#1a1a1a" />;
};

const styles = StyleSheet.create({
  container: {},
  card: {
    height: 280,
    width: 280,
    // borderRadius: 25,
    // marginTop: 20,
  },
});
