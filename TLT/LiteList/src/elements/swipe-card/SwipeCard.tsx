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
                const packageId = ['com.bernie.tlt.trakstar1m'];

                try {
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
                  alert('loading subscription.. please be patient');
                  const purchase: any = await requestSubscription({
                    sku: subscriptions[0].productId,
                  })
                    .then(async purchase => {
                      if (purchase) {
                        console.log(
                          '🚀 ~ file: usePayWall.ts:263 ~ handleSubscribe ~ purchase:',
                          purchase,
                        );

                        // await handleRegister({
                        //   TRXProfile,
                        //   userPackage: id,
                        //   purchase,
                        // }).then(async () => {
                        //   // userPackage, user_subscribed_at
                        //   const key = asyncStorageIndex.stacks_keys;
                        //   handleStore({key: key, value: TRXProfile.stacks_keys});
                        // });
                      }

                      return purchase;
                    })
                    .catch(error => {
                      console.log(
                        '🚀 ~ file: usePayWall.ts:260 ~ handleSubscribe ~ error:',
                        error,
                      );
                      setLoading(false);
                    });
                  console.log(
                    '🚀 ~ file: usePayWall.ts:263 ~ handleSubscribe ~ purchase:',
                    purchase,
                  );

                  setLoading(false);
                  console.log('here 1');
                  const transactionReceipt =
                    Platform.OS === 'android' ? purchase?.[0] : purchase;
                  console.log(
                    '🚀 ~ file: usePayWall.ts:147 ~ handleSubscribe ~ transactionReceipt:',
                    transactionReceipt,
                  );
                  console.log(
                    '🚀 ~ file: usePayWall.ts ~ line 167 ~ handleSubscribe ~ purchase',
                    purchase,
                  );

                  // if (typeof purchaserInfo.entitlements.active.my_entitlement_identifier !== "undefined") {
                  //   // Unlock that great "pro" content
                  // }
                } catch (e) {
                  if (!e.userCancelled) {
                    showError(e);
                  }
                }
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
      <Animatable.View animation={'bounceIn'}>
        <ImageBackground
          source={{
            uri: !player.hidden
              ? player?.players?.spotify?.item?.album?.images[0]?.url
              : recommendations[index].cover_art,
          }}
          style={{
            height: 300,
            margin: 30,
            justifyContent: 'flex-end',
          }}
          imageStyle={{
            borderRadius: 25,
          }}>
          <View
            style={{
              height: 60,
              backgroundColor: '#fff',
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
              source={{
                uri:
                  player?.players?.spotify?.item && !player.hidden
                    ? recommendations[index].cover_art
                    : recommendations[index].artist_art,
              }}
            />
          </View>
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
