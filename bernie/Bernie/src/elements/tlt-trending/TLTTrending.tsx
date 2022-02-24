import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  ImageBackground,
  Pressable,
} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const TLTTrendingElement = ({
  trending,
  card1,
  card2,
  card3,
  status,
  handleCard1,
  handleCard2,
  handleCard3,
  handleSubmit,
}: any) => {
  console.log('🚀 ~ file: TLTTrending.tsx ~ line 24 ~ trending,', trending);

  // if (trending == null) {
  //   return <View />;
  // }

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'transparent',
          marginVertical: 5,
          marginLeft: 15,
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            margin: 5,
          }}>
          <Text>1</Text>
          <View>
            {status === 'rising' && (
              <MaterialIcons name="arrow-drop-up" size={30} color={'#1db954'} />
            )}
            {status === 'falling' && (
              <MaterialIcons name="arrow-drop-down" size={30} color={'red'} />
            )}
            {status === 'same' && (
              <MaterialIcons name="minimize" size={30} color={'grey'} />
            )}
          </View>
        </View>
        <View style={{flex: 3, flexDirection: 'column'}}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                margin: 15,
                justifyContent: 'center',
                alignItems: 'flex-end',
                maxWidth: '70%',
              }}>
              <TextInput
                placeholder={trending ? trending?.one.artist : 'Artist'}
                style={{textAlign: 'right'}}
                onChangeText={(text: string) =>
                  handleCard1({name: 'artist', text})
                }
              />
              <TextInput
                placeholder={trending ? trending?.one.title : 'Title'}
                style={{textAlign: 'right'}}
                onChangeText={(text: string) =>
                  handleCard1({name: 'title', text})
                }
              />
              <TextInput
                placeholder={trending ? trending?.one.status : 'Status'}
                style={{textAlign: 'right'}}
                onChangeText={(text: string) =>
                  handleCard3({name: 'status', text})
                }
              />
            </View>
            <ImageBackground
              style={{
                height: 80,
                width: '100%',
                borderRadius: 10,
                backgroundColor: '#fff',
              }}
              resizeMode={card1.image ? 'cover' : 'contain'}
              source={{
                uri: card1.image
                  ? card1.image
                  : 'https://www.lifewire.com/thmb/P856-0hi4lmA2xinYWyaEpRIckw=/1920x1326/filters:no_upscale():max_bytes(150000):strip_icc()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg',
              }}>
              <Pressable
                style={{
                  flex: 1,
                  borderRadius: 10,
                  opacity: 0.7,
                  backgroundColor: 'red',
                }}
                onPress={() => handleCard1({name: 'image'})}></Pressable>
            </ImageBackground>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'transparent',
          marginVertical: 5,
          marginLeft: 15,
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            margin: 5,
          }}>
          <Text>2</Text>
          <View>
            {status === 'rising' && (
              <MaterialIcons name="arrow-drop-up" size={30} color={'#1db954'} />
            )}
            {status === 'falling' && (
              <MaterialIcons name="arrow-drop-down" size={30} color={'red'} />
            )}
            {status === 'same' && (
              <MaterialIcons name="minimize" size={30} color={'grey'} />
            )}
          </View>
        </View>
        <View style={{flex: 3, flexDirection: 'column'}}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                margin: 15,
                justifyContent: 'center',
                alignItems: 'flex-end',
                maxWidth: '70%',
              }}>
              <TextInput
                placeholder={trending ? trending?.two.artist : 'Artist'}
                style={{textAlign: 'right'}}
                onChangeText={(text: string) =>
                  handleCard2({name: 'artist', text})
                }
              />
              <TextInput
                placeholder={trending ? trending?.two.title : 'Title'}
                style={{textAlign: 'right'}}
                onChangeText={(text: string) =>
                  handleCard2({name: 'title', text})
                }
              />
              <TextInput
                placeholder={trending ? trending?.two.status : 'Status'}
                style={{textAlign: 'right'}}
                onChangeText={(text: string) =>
                  handleCard2({name: 'status', text})
                }
              />
            </View>
            <ImageBackground
              style={{
                height: 80,
                width: '100%',
                borderRadius: 10,
                backgroundColor: '#fff',
              }}
              resizeMode={card2.image ? 'cover' : 'contain'}
              source={{
                uri: card2.image
                  ? card2.image
                  : 'https://www.lifewire.com/thmb/P856-0hi4lmA2xinYWyaEpRIckw=/1920x1326/filters:no_upscale():max_bytes(150000):strip_icc()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg',
              }}>
              <Pressable
                style={{
                  backgroundColor: 'red',
                  flex: 1,
                  borderRadius: 10,
                  opacity: 0.7,
                }}
                onPress={() => handleCard2({name: 'image'})}></Pressable>
            </ImageBackground>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'transparent',
          marginVertical: 5,
          marginLeft: 15,
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            margin: 5,
          }}>
          <Text>3</Text>
          <View>
            {status === 'rising' && (
              <MaterialIcons name="arrow-drop-up" size={30} color={'#1db954'} />
            )}
            {status === 'falling' && (
              <MaterialIcons name="arrow-drop-down" size={30} color={'red'} />
            )}
            {status === 'same' && (
              <MaterialIcons name="minimize" size={30} color={'grey'} />
            )}
          </View>
        </View>
        <View style={{flex: 3, flexDirection: 'column'}}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                margin: 15,
                justifyContent: 'center',
                alignItems: 'flex-end',
                maxWidth: '70%',
              }}>
              <TextInput
                placeholder={trending ? trending?.three.artist : 'Artist'}
                style={{textAlign: 'right'}}
                onChangeText={(text: string) =>
                  handleCard3({name: 'artist', text})
                }
              />
              <TextInput
                placeholder={trending ? trending?.three.title : 'Title'}
                style={{textAlign: 'right'}}
                onChangeText={(text: string) =>
                  handleCard3({name: 'title', text})
                }
              />
              <TextInput
                placeholder={trending ? trending?.three.status : 'Status'}
                style={{textAlign: 'right'}}
                onChangeText={(text: string) =>
                  handleCard3({name: 'status', text})
                }
              />
            </View>
            <ImageBackground
              style={{
                height: 80,
                width: '100%',
                borderRadius: 10,
                backgroundColor: '#fff',
              }}
              resizeMode={card3.image ? 'cover' : 'contain'}
              source={{
                uri: card3.image
                  ? card3.image
                  : 'https://www.lifewire.com/thmb/P856-0hi4lmA2xinYWyaEpRIckw=/1920x1326/filters:no_upscale():max_bytes(150000):strip_icc()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg',
              }}>
              <Pressable
                style={{
                  backgroundColor: 'red',
                  flex: 1,
                  borderRadius: 10,
                  opacity: 0.7,
                }}
                onPress={() => handleCard3({name: 'image'})}></Pressable>
            </ImageBackground>
          </View>
        </View>
      </View>
      <Button title="submit" onPress={handleSubmit} />
    </>
  );
};
