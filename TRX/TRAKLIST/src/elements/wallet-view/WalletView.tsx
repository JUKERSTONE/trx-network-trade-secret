import React from 'react';
import {View, Text} from 'react-native';
import {AlphabetList} from 'react-native-section-alphabet-list';

export const WalletView = ({wallet}: any) => {
  return (
    <AlphabetList
      data={wallet}
      style={{backgroundColor: '#fff'}}
      indexLetterStyle={{
        color: 'green',
      }}
      renderCustomItem={item => (
        <View style={{backgroundColor: '#fff', padding: 30, margin: 15}}>
          <Text /*style={styles.listItemLabel}*/>{item.value}</Text>
        </View>
      )}
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
