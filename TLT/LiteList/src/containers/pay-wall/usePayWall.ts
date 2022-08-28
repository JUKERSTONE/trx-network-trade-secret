import React, {useEffect, useState, useContext} from 'react';
import {useAuthentication} from '../../authentication';
import {api, useAPI} from '../../api';
import {useFirebase} from '../../app';
import {useAsyncStorage, asyncStorageIndex} from '../../stores';
import Purchases from 'react-native-purchases';

export const usePayWall = ({navigation, route}: any) => {
  console.log('🚀 ~ file: usePayWall.ts ~ line 9 ~ usePayWall ~ route', route);
  const {handleRegister} = useFirebase();
  const {useGET} = useAPI();
  const {handleStore} = useAsyncStorage();

  const [data, setData] = useState<any>([]);

  const {profile} = route.params;
  console.log(
    '🚀 ~ file: usePayWall.ts ~ line 14 ~ usePayWall ~ profile',
    profile,
  );

  useEffect(() => {
    setTimeout(() => {
      const data = [
        {
          id: 'free',
          title: 'TRAKLITE+',
          imageURL:
            'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/sonar.png?alt=media',
          TRAK: {
            tier: {
              tier1: null,
              tier2: null,
              tier3: 5,
              tier4: 25,
            },
            trak: {
              track: 30,
              artist: null,
              album: null,
            },
          },
          price: 0,
          currency: 'GBP',
        },
        {
          id: 'basic',
          title: 'TRAKLIST',
          imageURL:
            'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/euphoric_man.png?alt=media',
          TRAK: {
            tier: {
              tier1: null,
              tier2: 5,
              tier3: 15,
              tier4: 40,
            },
            trak: {
              track: 45,
              artist: 10,
              album: 5,
            },
          },
          price: 4.33,
          currency: 'GBP',
        },
        {
          id: 'pro',
          title: 'TRAKLIST+',
          imageURL:
            'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/euphoric_man%402x.png?alt=media',
          TRAK: {
            tier: {
              tier1: null,
              tier2: 10,
              tier3: 20,
              tier4: 60,
            },
            trak: {
              track: 65,
              artist: 15,
              album: 10,
            },
          },
          price: 9.33,
          currency: 'GBP',
        },
        {
          id: 'musichead',
          title: 'TRAKSTAR',
          imageURL:
            'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/happy_girl.png?alt=media&token=b056459c-f5b5-4430-a7dc-a21e48d357df',
          TRAK: {
            tier: {
              tier1: 5,
              tier2: 10,
              tier3: 25,
              tier4: 60,
            },
            trak: {
              track: 70,
              artist: 15,
              album: 15,
            },
          },
          price: 14.33,
          currency: 'GBP',
        },
      ];
      setData(data);
    }, 400);
  }, []);

  const handleSubscribe = async ({id}: any) => {
    console.log(
      '🚀 ~ file: usePayWall.ts ~ line 116 ~ handleSubscribe ~ id',
      id,
    );
    // const subscription = id;

    // send to trx backend for user profile

    //

    // alert(id);

    const offerings = await Purchases.getOfferings()
      .then((res: any) => {
        return res.current.availablePackages;
      })
      .catch((err: any) => {
        console.log('🚀 ~ file: useSwipe.ts ~ line 213 ~ offerings ~ err', err);
      });

    switch (id) {
      case 'free':
        const {...profileObject} = profile;

        const TRXProfile = {
          ...profileObject,
          subscription: id,
        };

        await handleRegister({TRXProfile}).then(() => {
          const key = asyncStorageIndex.stacks_keys;
          handleStore({key: key, value: TRXProfile.stacks_keys});
        });
        break;
      case 'basic':
        try {
          const purchase = await Purchases.purchasePackage(offerings[0])
            .then(async (res: any) => {
              const {...profileObject} = profile;

              const TRXProfile = {
                ...profileObject,
                subscription: id,
              };

              await handleRegister({TRXProfile}).then(() => {
                const key = asyncStorageIndex.stacks_keys;
                handleStore({key: key, value: TRXProfile.stacks_keys});
              });
            })
            .catch((err: any) => {
              alert('cancel');
              console.log(
                '🚀 ~ file: usePayWall.ts ~ line 167 ~ handleSubscribe ~ err',
                err,
              );
            });
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
        break;
      case 'pro':
        try {
          const purchase = await Purchases.purchasePackage(offerings[1])
            .then(async (res: any) => {
              const {...profileObject} = profile;

              const TRXProfile = {
                ...profileObject,
                subscription: id,
              };

              await handleRegister({TRXProfile}).then(() => {
                const key = asyncStorageIndex.stacks_keys;
                handleStore({key: key, value: TRXProfile.stacks_keys});
              });
            })
            .catch((err: any) => {
              alert('cancel');
              console.log(
                '🚀 ~ file: usePayWall.ts ~ line 167 ~ handleSubscribe ~ err',
                err,
              );
            });
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
        break;
      case 'musichead':
        try {
          const purchase = await Purchases.purchasePackage(offerings[2])
            .then(async (res: any) => {
              const {...profileObject} = profile;

              const TRXProfile = {
                ...profileObject,
                subscription: id,
              };

              await handleRegister({TRXProfile}).then(() => {
                const key = asyncStorageIndex.stacks_keys;
                handleStore({key: key, value: TRXProfile.stacks_keys});
              });
            })
            .catch((err: any) => {
              alert('cancel');
              console.log(
                '🚀 ~ file: usePayWall.ts ~ line 167 ~ handleSubscribe ~ err',
                err,
              );
            });
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
        break;
      default:
        alert('other');
        break;
    }
  };

  return {
    data,
    handleSubscribe,
  };
};
