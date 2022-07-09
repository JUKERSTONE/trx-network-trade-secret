import React, {useEffect, useState, useContext} from 'react';
import {api, useAPI} from '../../api';
import {toggleTRAKRelationshipsView, store} from '../../stores';
import {useLITELISTState, useFirebase} from '../../app';
import {Alert} from 'react-native';

export const useProfile = ({isOwner, navigation, route}: any) => {
  const {handleGetState} = useLITELISTState();
  const {
    handleToggleProfileVisibility,
    handleToggleFollowUser,
    handleUpdateTransaction,
  } = useFirebase();
  const [profile, setProfile] = useState();
  const [favorites, setFavorites] = useState();
  const [playlists, setPlaylists] = useState();
  const [refreshing, setRefreshing] = React.useState(false);
  const [streaming, setStreaming] = useState<any>([]);
  const {useGET} = useAPI();

  function shuffle(array: any) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  useEffect(() => {
    const profile = handleGetState({index: 'profile'});
    const TRXProfile = profile.TRX;
    console.log(
      '🚀 ~ file: useProfile.ts ~ line 38 ~ useEffect ~ TRXProfile',
      TRXProfile,
    );
    const favorites = JSON.parse(TRXProfile.favorites);
    const playlists = JSON.parse(TRXProfile.playlists);
    console.log(
      '🚀 ~ file: useProfile.ts ~ line 40 ~ useEffect ~ playlists',
      playlists,
    );
    handleProfile(profile);
    setFavorites(favorites);
    setPlaylists(playlists);
  }, []);

  const handleProfile = (profile: any) => {
    const TRXProfile = profile.TRX;
    setProfile(TRXProfile);
  };

  const handleNFTNavigation = async (item: any) => {
    console.log(
      '🚀 ~ file: useProfile.ts ~ line 63 ~ handleNFTNavigation ~ item',
      item,
    );
    const route = api.stacks({
      method: 'transaction',
      payload: {transactionId: item.tx_id},
    });
    console.log(
      '🚀 ~ file: useNFTStatus.ts ~ line 26 ~ handleGetTransaction ~ route',
      route,
    );

    const transaction: any = await useGET({route})
      .then(response => {
        return response.data;
      })
      .catch(() => {
        alert('Unrecognised Transaction ID');
      });
    console.log(
      '🚀 ~ file: useProfile.ts ~ line 77 ~ handleNFTNavigation ~ transaction',
      transaction,
    );

    // const tx_status = response.tx_status;

    // alert(tx_status);
    handleUpdateTransaction({
      ...transaction,
      asset_name: item.asset_name,
      cover_art: item.cover_art,
    });
  };

  const handleNextTransaction = (tx_status: any, item: any) => {
    console.log(
      '🚀 ~ file: useProfile.ts ~ line 99 ~ handleNextTransaction ~ item',
      item,
    );
    const functionName = item.contract_call.function_name;

    if (functionName === 'user-purchase-whitelist') {
      switch (tx_status) {
        case 'pending':
          alert('Transaction state pending. Please wait');
          break;
        case 'abort_by_response':
          Alert.alert(`Transaction failed.`, `Try again?`, [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'RETRY',
              onPress: async () => {
                alert('reloading transaction');
              },
            },
          ]);
          break;
        case 'success':
          Alert.alert(`${item.asset_name}`, `Claim Your Whitelist?`, [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'Proceed',
              onPress: async () => {
                navigation.navigate('MODAL', {
                  type: 'nft-view',
                  exchange: {
                    active: true,
                    item: {
                      status: 'claim-whitelist',
                      nft: item,
                    },
                  },
                });
              },
            },
          ]);
          break;
        default:
          alert(tx_status);
          break;
      }
    } else if ('bernard-claim-whitelist') {
      switch (tx_status) {
        case 'pending':
          alert('Transaction state pending. Please wait');
          break;
        case 'abort_by_response':
          Alert.alert(`Transaction failed.`, `Try again?`, [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'RETRY',
              onPress: async () => {
                alert('reloading transaction');
              },
            },
          ]);
          break;
        case 'success':
          Alert.alert(`Claim Your NFT?`, ``, [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'Proceed',
              onPress: async () => {
                navigation.navigate('MODAL', {
                  type: 'nft-view',
                  exchange: {
                    active: true,
                    item: {
                      status: 'claim-nft',
                      nft: item,
                    },
                  },
                });
              },
            },
          ]);
          break;
        default:
          alert(tx_status);
          break;
      }
    } else if ('user-claim-nft') {
      switch (tx_status) {
        case 'pending':
          alert('Transaction state pending. Please wait');
          break;
        case 'abort_by_response':
          Alert.alert(`Transaction failed.`, `Try again?`, [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'RETRY',
              onPress: async () => {
                alert('reloading transaction');
              },
            },
          ]);
          break;
        case 'success':
          alert('ACCESS FULL NFT');
          break;
        default:
          alert(tx_status);
          break;
      }
    }
  };

  return {
    profile,
    favorites,
    playlists,
    handleToggleProfileVisibility,
    handleToggleFollowUser,
    handleNFTNavigation,
    handleNextTransaction,
    refreshing,
  };
};
