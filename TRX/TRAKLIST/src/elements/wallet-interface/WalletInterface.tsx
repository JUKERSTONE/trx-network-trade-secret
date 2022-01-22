import React from 'react';
import {View, Text, Image, Pressable, useWindowDimensions} from 'react-native';
import {AlphabetList} from 'react-native-section-alphabet-list';
import {VHeader, Body} from '../typography';
import {TabView, TabBar} from 'react-native-tab-view';
import {WalletView} from '../wallet-view';

export const WalletInterfaceElement = ({
  wallet = [],
  trak,
  handleNavigateTRAK,
}: any) => {
  console.log(
    '🚀 ~ file: WalletInterface.tsx ~ line 20 ~ WalletInterfaceElement ~ wallet',
    trak,
  );

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'WALLET'},
    {key: 'second', title: 'ACTIVITY'},
  ]);
  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={({route}) => {
        switch (route.key) {
          case 'first':
            return (
              <WalletView
                wallet={wallet}
                data={trak}
                handleNavigateTRAK={handleNavigateTRAK}
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
          style={{backgroundColor: '#1a1a1a'}}
          // tabStyle={[
          //   tabStyles.tabBarWrapper,
          //   tabStyles.tabBarFirst(
          //     //temporary set to 0 since current tabs fit on one screen
          //     0,
          //   ),
          // ]}
          // activeColor={tabStyles.tabActive.color}
          // inactiveColor={tabStyles.tabInActive.color}
          // renderLabel={TabBarLabel}
          // indicatorContainerStyle={tabStyles.indicatorStyle}
          indicatorStyle={{backgroundColor: '#fff'}}
        />
      )}
    />
  );
};
