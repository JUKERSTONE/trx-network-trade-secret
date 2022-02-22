import React, {FC} from 'react';
import {View, Pressable} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface IArtistHeader {
  colors: any;
}

export const ArtistHeader: FC<IArtistHeader> = ({colors}) => {
  return (
    <View
      style={{
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: 300,
      }}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 5,
            backgroundColor: colors?.primary,
            padding: 4,
            borderRadius: 5,
            width: 100,
            justifyContent: 'space-around',
          }}>
          <Pressable>
            <MaterialIcons
              name="preview"
              size={22}
              color={colors?.background}
            />
          </Pressable>
          <Pressable onPress={() => alert('subscribe')}>
            <MaterialCommunityIcons
              name="heart"
              size={22}
              color={false ? '#1db954' : colors?.background}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};
