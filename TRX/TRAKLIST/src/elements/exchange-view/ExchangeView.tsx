import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, Image, Alert} from 'react-native';
import {useTRAKLISTState} from '../../app/';
import {VHeader, Body} from '../';
import {FamzViewContainer, WalletExchangeContainer} from '../../containers';
import {ExchangeViewBodyComponent} from '../../components';

export const ExchangeView = ({state, ...props}: any) => {
  const mode = state.exchange.mode;
  const item = state.exchange.item;
  const isNFT = item?.isNFT;
  let thumbnail, title: any, artist: any;
  switch (isNFT) {
    case true:
      thumbnail = item?.nft.trakIMAGE;
      title = item?.nft.trakTITLE;
      artist = item?.nft.trakARTIST;
      break;
    case false:
      thumbnail = item?.thumbnail;
      title = item?.title;
      artist = item?.artist;
      break;
  }

  const {handleGetState} = useTRAKLISTState();
  const [wallet, setWallet] = useState();
  const [trak, setTRAK] = useState();
  useEffect(() => {
    const profile: any = handleGetState({index: 'profile'});
    const TRXProfile = profile.TRX;
    const product = TRXProfile?.wallet;

    const wallet = product?.map((item: any) => ({
      value: item.isNFT ? item.nft.trakTITLE : item.title,
      key: item.isNFT ? item.nftURI : item.trakURI,
    }));

    setWallet(wallet);
    setTRAK(product);
  }, []);

  return (
    <View style={{flex: 1, width: '100%'}}>
      <View style={{backgroundColor: 'transparent'}}>
        <View
          style={{
            margin: 10,
          }}>
          <View
            style={{
              height: 80,
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}>
            <View
              style={{
                justifyContent: 'flex-end',
                marginRight: 20,
                flex: 1,
              }}>
              <Image
                source={{uri: thumbnail}}
                style={{
                  backgroundColor: '#1B4F26',
                  height: '100%',
                  width: '100%',
                  borderRadius: 10,
                }}
              />
            </View>
            <View
              style={{
                marginRight: 25,
                backgroundColor: 'transparent',
                justifyContent: 'center',
                alignItems: 'flex-end',
                maxWidth: '60%',
              }}>
              <VHeader
                numberOfLines={1}
                type="four"
                color={'#fff'}
                text={title}
              />
              <Body
                numberOfLines={1}
                type="one"
                color={'#fff'}
                text={artist}
                textAlign="right"
              />
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}>
        <ExchangeViewBodyComponent
          mode={mode}
          isNFT={isNFT}
          wallet={wallet}
          trak={trak}
          item={item}
          title={title}
          artist={artist}
          {...props}
        />
      </View>
    </View>
  );
};
