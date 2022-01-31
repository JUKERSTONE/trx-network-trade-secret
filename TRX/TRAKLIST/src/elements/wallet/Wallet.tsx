import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  useWindowDimensions,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {AlphabetList} from 'react-native-section-alphabet-list';
import {VHeader, Body} from '../typography';
import {TabView, TabBar} from 'react-native-tab-view';
import {WalletTab} from '../wallet-tab';
import {colors} from '../../core';

export const WalletElement = ({
  wallet = [],
  trak,
  handleNavigateTRAK,
  handleExchange,
}: any) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'WALLET'},
    {key: 'second', title: 'ACTIVITY'},
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
    <TabView
      navigationState={{index, routes}}
      style={{backgroundColor: '#1d995F'}}
      renderScene={({route}) => {
        switch (route.key) {
          case 'first':
            return (
              <WalletTab
                wallet={wallet}
                data={trak}
                handleNavigateTRAK={handleNavigateTRAK}
                handleExchange={handleExchange}
              />
            );
          case 'second':
            return <View style={{backgroundColor: 'blue', flex: 1}} />;
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
  );
};
