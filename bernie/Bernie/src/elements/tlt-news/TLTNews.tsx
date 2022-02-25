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

export const TLTNewsElement = ({
  news,
  card1,
  card2,
  card3,
  status,
  handleCard1,
  handleCard2,
  handleCard3,
  handleSubmit,
}: any) => {
  console.log('🚀 ~ file: TLTnews.tsx ~ line 24 ~ news,', news);

  // if (news == null) {
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
                placeholder={/*news ? news?.one.header : */ 'Header'}
                style={{textAlign: 'right'}}
                onChangeText={(text: string) =>
                  handleCard1({name: 'header', text})
                }
              />
              <TextInput
                placeholder={/*news ? news?.one.subHeader : */ 'Sub Header'}
                style={{textAlign: 'right'}}
                onChangeText={(text: string) =>
                  handleCard1({name: 'subHeader', text})
                }
              />
              <TextInput
                placeholder={/*news ? news?.one.subHeader : */ 'URL'}
                style={{textAlign: 'right'}}
                onChangeText={(text: string) =>
                  handleCard1({name: 'url', text})
                }
              />
              <TextInput
                placeholder={'Image'}
                style={{textAlign: 'right'}}
                onChangeText={(text: string) =>
                  handleCard1({name: 'image', text})
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
              }}></ImageBackground>
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
                placeholder={/*news ? news?.two.header : */ 'Header'}
                style={{textAlign: 'right'}}
                onChangeText={(text: string) =>
                  handleCard2({name: 'header', text})
                }
              />
              <TextInput
                placeholder={/*news ? news?.two.subHeader : */ 'Sub Header'}
                style={{textAlign: 'right'}}
                onChangeText={(text: string) =>
                  handleCard2({name: 'subHeader', text})
                }
              />
              <TextInput
                placeholder={/*news ? news?.one.subHeader : */ 'URL'}
                style={{textAlign: 'right'}}
                onChangeText={(text: string) =>
                  handleCard2({name: 'url', text})
                }
              />
              <TextInput
                placeholder={'Image'}
                style={{textAlign: 'right'}}
                onChangeText={(text: string) =>
                  handleCard2({name: 'image', text})
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
              }}></ImageBackground>
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
                placeholder={/*news ? news?.three.header : */ 'Header'}
                style={{textAlign: 'right'}}
                onChangeText={(text: string) =>
                  handleCard3({name: 'header', text})
                }
              />
              <TextInput
                placeholder={/*news ? news?.three.subHeader : */ 'Sub Header'}
                style={{textAlign: 'right'}}
                onChangeText={(text: string) =>
                  handleCard3({name: 'subHeader', text})
                }
              />
              <TextInput
                placeholder={/*news ? news?.one.subHeader : */ 'URL'}
                style={{textAlign: 'right'}}
                onChangeText={(text: string) =>
                  handleCard3({name: 'url', text})
                }
              />
              <TextInput
                placeholder={'Image'}
                style={{textAlign: 'right'}}
                onChangeText={(text: string) =>
                  handleCard3({name: 'image', text})
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
              }}></ImageBackground>
          </View>
        </View>
      </View>
      <Button title="submit" onPress={handleSubmit} />
    </>
  );
};
