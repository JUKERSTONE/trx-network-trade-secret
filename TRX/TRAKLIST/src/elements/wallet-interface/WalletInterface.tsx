import React from 'react';
import {View, Text} from 'react-native';
import {AlphabetList} from 'react-native-section-alphabet-list';

// const data = [
//   {value: 'Lillie-Mai Allen', key: 'lCUTs2'},
//   {value: 'Emmanuel Goldstein', key: 'TXdL0c'},
//   {value: 'Winston Smith', key: 'zqsiEw'},
//   {value: 'William Blazkowicz', key: 'psg2PM'},
//   {value: 'Gordon Comstock', key: '1K6I18'},
//   {value: 'Philip Ravelston', key: 'NVHSkA'},
//   {value: 'Rosemary Waterlow', key: 'SaHqyG'},
//   {value: 'Julia Comstock', key: 'iaT1Ex'},
//   {value: 'Mihai Maldonado', key: 'OvMd5e'},
//   {value: 'Murtaza Molina', key: '25zqAO'},
//   {value: 'Peter Petigrew', key: '8cWuu3'},
// ];

export const WalletInterfaceElement = ({wallet = []}: any) => {
  console.log(
    '🚀 ~ file: WalletInterface.tsx ~ line 20 ~ WalletInterfaceElement ~ wallet',
    wallet,
  );
  return (
    <AlphabetList
      data={wallet}
      style={{backgroundColor: '#fff'}}
      indexLetterStyle={{
        color: 'green',
      }}
      renderCustomItem={item => {
        console.log(
          '🚀 ~ file: WalletInterface.tsx ~ line 40 ~ WalletInterfaceElement ~ item',
          item,
        );
        return (
          <View style={{backgroundColor: '#fff', padding: 30, margin: 15}}>
            <Text /*style={styles.listItemLabel}*/>
              {JSON.stringify(item.value)}
            </Text>
          </View>
        );
      }}
      renderCustomSectionHeader={section => (
        <View
          style={{
            backgroundColor: 'whitesmoke',
            padding: 10,
            borderBottomWidth: 2,
            borderBottomColor: 'green',
            shadowOffset: {
              width: 10,
              height: 5,
            },
            shadowOpacity: 0.3,
            shadowRadius: 10,
            shadowColor: 'green',
          }}>
          <Text style={{fontSize: 25, color: 'green'}}>{section.title}</Text>
        </View>
      )}
    />
  );
};
