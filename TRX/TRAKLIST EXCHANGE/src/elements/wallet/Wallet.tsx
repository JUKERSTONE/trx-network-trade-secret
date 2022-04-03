import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  useWindowDimensions,
  ActivityIndicator,
  Dimensions,
  Button,
  SafeAreaView,
} from 'react-native';
import {AlphabetList} from 'react-native-section-alphabet-list';
import {VHeader, Body} from '../typography';
import {TabView, TabBar} from 'react-native-tab-view';
import {WalletTabElement} from '../wallet-tab';
import {colors} from '../../core';

export const WalletElement = ({
  wallet = [],
  trak,
  handleNavigateTRAK,
  handleNavigateNFT,
  handleExchange,
  handleConnectWallet,
  hasForchain,
  profile,
}: any) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'TRAK'},
    {key: 'second', title: 'NFT'},
    {key: 'third', title: 'ACTIVITY'},
  ]);

  if (trak == null)
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: Dimensions.get('screen').height,
        }}>
        <ActivityIndicator color="blue" size="small" />
      </View>
    );
  return (
    <View style={{flex: 1}}>
      <View style={{alignItems: 'center', backgroundColor: '#1a1a1a'}}>
        <View
          style={{
            padding: 10,
            width: '80%',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              height: 100,
              width: 100,
              backgroundColor: '#fff',
              borderRadius: 10,
              marginBottom: 15,
            }}
          />
          <Text style={{fontSize: 15, fontWeight: 'bold', color: 'grey'}}>
            {profile.user_name}
          </Text>
        </View>
      </View>
      <TabView
        navigationState={{index, routes}}
        style={{backgroundColor: '#1d995F'}}
        renderScene={({route}) => {
          switch (route.key) {
            case 'first':
              return <View style={{backgroundColor: 'blue', flex: 1}} />;
            case 'second':
              return (
                <WalletTabElement
                  wallet={wallet}
                  data={trak}
                  handleNavigateTRAK={handleNavigateTRAK}
                  handleNavigateNFT={handleNavigateNFT}
                  handleExchange={handleExchange}
                  hasForchain={hasForchain}
                  handleConnectWallet={handleConnectWallet}
                />
              );

            case 'third':
              return <View style={{backgroundColor: 'red', flex: 1}} />;
            default:
              return <View />;
          }
        }}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={props => (
          <TabBar
            {...props}
            style={{backgroundColor: colors.light.primary}}
            renderLabel={({route, focused, color}) => (
              <Text style={{color, fontSize: 15, fontWeight: 'bold'}}>
                {route.title}
              </Text>
            )}
            indicatorStyle={{backgroundColor: '#fff'}}
          />
        )}
      />
    </View>
  );
};
