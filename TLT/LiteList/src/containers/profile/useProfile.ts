import React, {useEffect, useState, useContext} from 'react';
import {api, useAPI} from '../../api';
import {
  toggleTRAKRelationshipsView,
  store,
  handleMediaPlayerAction,
} from '../../stores';
import {useLITELISTState, useFirebase} from '../../app';
import {Alert} from 'react-native';
import axios from 'axios';
import {
  SPOTIFY_GET_ARTIST,
  SPOTIFY_GET_ARTIST_TOP_TRACKS,
  SPOTIFY_GET_ARTIST_ALBUMS,
  SPOTIFY_GET_ARTIST_RELATED_ARTISTS,
  SPOTIFY_PLAYLIST_ITEMS,
} from '../../api';
import Clipboard from '@react-native-clipboard/clipboard';

export const useProfile = ({isOwner, navigation, route}: any) => {
  const {handleGetState} = useLITELISTState();
  const {
    handleToggleProfileVisibility,
    handleToggleFollowUser,
    handleUpdateTransaction,
  } = useFirebase();
  const [profile, setProfile] = useState();
  const [loadingArtist, setLoadingArtist] = useState<any>(0);
  const [keys, setKeys] = useState<any>();
  const [favorites, setFavorites] = useState();
  const [TRXProfile, setTRXProfile] = useState<any>();
  const [playlists, setPlaylists] = useState();
  const [refreshing, setRefreshing] = React.useState(false);
  const [streaming, setStreaming] = useState<any>([]);
  const [transactions, setTransactions] = useState<any>([]);
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
    const crypto = handleGetState({index: 'crypto'});
    const keys = handleGetState({index: 'keys'});
    const TRXProfile = profile.TRX;
    console.log(
      '🚀 ~ file: useProfile.ts ~ line 52 ~ useEffect ~ TRXProfile',
      TRXProfile,
    );
    setTRXProfile(TRXProfile);

    const favorites = JSON.parse(TRXProfile.favorites);
    const playlists = JSON.parse(TRXProfile.playlists);
    const transactions = crypto.transactions;
    console.log(
      '🚀 ~ file: useProfile.ts ~ line 40 ~ useEffect ~ playlists',
      playlists,
    );
    handleProfile(profile, keys);
    setFavorites(favorites);
    setPlaylists(playlists);
    handleTransactions(transactions);
  }, []);

  const handleTransactions = async (transactions: any) => {
    const transacationsArray = await Promise.all(
      transactions.map(async (transaction: any) => {
        console.log(
          '🚀 ~ file: useProfile.ts ~ line 108 ~ transactions.map ~ transaction',
          transaction,
        );
        const txId = transaction.txId;

        const route = `https://stacks-node-api.mainnet.stacks.co/extended/v1/tx/${txId}`;
        return axios
          .get(route, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then((res: any) => {
            // return {[transaction.id]: res.data};
            return {
              success: true,
              payload: {...res.data, recipientURI: transaction.recipientURI},
              message: '',
            };
          })
          .catch(err => {
            console.log(
              '🚀 ~ file: getWallet.ts ~ line 46 ~ Object.keys ~ err',
              err,
            );
            return {
              success: false,
              payload: transaction,
              error: 'no data for this transaction',
            };
          });
      }),
    );
    console.log(
      '🚀 ~ file: useTransactions.ts ~ line 71 ~ handleTransactions ~ transactions',
      transacationsArray,
    );

    const sortedTransactions = transacationsArray.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      // @ts-ignore

      return (
        // @ts-ignore
        new Date(b.payload.receipt_time_iso) -
        // @ts-ignore
        new Date(a.payload.receipt_time_iso)
      );
    });

    setTransactions(sortedTransactions);
  };

  const handleProfile = (profile: any, keys: any) => {
    const TRXProfile = profile.TRX;
    setProfile(TRXProfile);
    setKeys(keys);
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

  const handleArtistNavigation = (item: any, index: any) => {
    setLoadingArtist(index);
    console.log(
      '🚀 ~ file: useProfile.ts ~ line 264 ~ axios.get ~ TRXProfile',
      TRXProfile,
    );

    console.log('🚀 ~ file: useProfile.ts ~ line 272 ~ axios.get ~ keys', keys);

    const appToken = keys.spotify.appToken;

    console.log(
      '🚀 ~ file: useProfile.ts ~ line 241 ~ handleArtistNavigation ~ item',
      item,
    );

    return axios
      .all([
        axios.get(SPOTIFY_GET_ARTIST(item.id), {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + appToken,
          },
        }),
        axios.get(SPOTIFY_GET_ARTIST_TOP_TRACKS(item.id), {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + appToken,
          },
        }),
        axios.get(SPOTIFY_GET_ARTIST_ALBUMS(item.id), {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + appToken,
          },
        }),
        axios.get(SPOTIFY_GET_ARTIST_RELATED_ARTISTS(item.id), {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + appToken,
          },
        }),
      ])
      .then(
        axios.spread((data1, data2, data3, data4) => {
          const artist = data1.data;
          const artistTopTracks = data2.data.tracks;
          const artistAlbums = data3.data.items;
          const artistRelated = data4.data.artists;

          const artistData = {
            artist: {
              id: artist.id,
              name: artist.name,
              followers: artist.followers,
              genres: artist.genres,
              images: artist.images,
              popularity: artist.popularity,
            },
            artist_top_tracks: artistTopTracks,
            artist_albums: artistAlbums,
            artist_related: artistRelated,
          };

          // navigation.navigate('ArtistView', {artistData});

          console.log(
            '🚀 ~ file: useProfile.ts ~ line 126 ~ axios.spread ~ artistData',
            artistData,
          );

          setTimeout(() => {
            setLoadingArtist(false);
            navigation.navigate('MODAL', {
              type: 'artist-view',
              exchange: {
                active: true,
                item: {
                  artist: artistData,
                },
              },
            });
          }, 800);
        }),
      )
      .catch(error => {
        alert('errors');
        // return {
        //   success: false,
        //   data: error,
        // };
      });
  };

  const handleTRAK = (item: any) => {
    Alert.alert(
      `${item.artists[0].name} - ${item.name}`,
      `What would you like to do?`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Preview',
          onPress: async () => {
            if (item.preview_url) {
              const action = handleMediaPlayerAction({
                playbackState: 'source',
                uri: item.preview_url,
                url: item.cover_art,
                artist: item.artists[0].name,
                title: item.name,
                id: {
                  spotify: item.id,
                  apple_music: '',
                },
              });
              store.dispatch(action);
            } else {
              alert(
                `Sorry. ${item.artists[0].name} didn't upload a preview for '${item.name}'`,
              );
            }
          },
        },
        {
          text: 'FANCLUB',
          onPress: async () => {
            navigation.navigate('MODAL', {
              type: 'match-trak',
              exchange: {
                active: true,
                item: {
                  title: item.name,
                  artist: item.artists[0].name,
                },
              },
            });
          },
        },
      ],
    );
  };

  const handlePlaylistNavigation = (item: any) => {
    console.log(
      '🚀 ~ file: useProfile.ts ~ line 394 ~ handlePlaylistNavigation ~ item',
      item,
    );
    const type = item.info;
    const appToken = keys.spotify.appToken;

    switch (type) {
      case 'playlists:spotify':
        axios
          .get(SPOTIFY_PLAYLIST_ITEMS(item.id), {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + appToken,
            },
          })
          .then(response => {
            console.log(response.data, 'oiuy');
            const items = {
              tracks: [...response.data.items],
              images: item.images[0].url,
            };
            console.log(
              '🚀 ~ file: useProfile.ts ~ line 89 ~ handleView ~ items',
              items,
            );
            // navigation.navigate('TapeView', {tape: items});
            navigation.navigate('MODAL', {
              type: 'playlist-view',
              exchange: {
                active: true,
                item: items,
              },
            });
          });
        break;
    }
    // alert(JSON.stringify(item));
  };

  const handleSendCrypto = () => {
    navigation.navigate('CRYPTO');
  };

  const handleClipboard = () => {
    Clipboard.setString(TRXProfile.stacks_keys.public);
    alert(TRXProfile.stacks_keys.public);
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
    handleArtistNavigation,
    loadingArtist,
    handleTRAK,
    handlePlaylistNavigation,
    handleSendCrypto,
    TRXProfile,
    transactions,
    handleClipboard,
  };
};
