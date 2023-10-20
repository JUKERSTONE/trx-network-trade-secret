import React from 'react';
import {
  View,
  TextInput,
  Text,
  ScrollView,
  Button,
  TouchableHighlight,
} from 'react-native';
import {styles} from '../screen-wrapper/styles';
import auth from '@react-native-firebase/auth';
import {useAsyncStorage} from '../../stores';
import {FlatList} from 'react-native-gesture-handler';
import {TokencyAction, TokencyForm} from '../mine-token/internal';

export const TRXFillElement = ({
  navigation,
  missingProviders,
  handleIDChange,
  handleSubmitTRX,
  ...props
}: any) => {
  console.log(
    '🚀 ~ file: TRXFill.tsx:12 ~ missingProviders:',
    missingProviders,
  );

  return (
    <View
      style={{
        backgroundColor: '#cecece',
        flex: 1,
        alignItems: 'center',
      }}>
      <FlatList
        listKey="TRAK"
        data={missingProviders}
        renderItem={({item}: any) => {
          let suffix =
            item === 'spotify' ? 'uri' : item === 'apple_music' ? 'id' : 'url';
          return (
            <>
              <TokencyForm
                name={`${item} ${suffix}`}
                {...props}
                hasAction={false}
                action="SET"
                handleInputChange={(text: string) =>
                  handleIDChange({text, provider: item})
                }
              />
            </>
          );
        }}
      />
      <View
        style={{
          height: 40,
          width: 180,
          backgroundColor: '#232323',
          borderRadius: 10,
        }}>
        <Button title="SUBMIT" onPress={handleSubmitTRX} />
      </View>
    </View>
  );
};
