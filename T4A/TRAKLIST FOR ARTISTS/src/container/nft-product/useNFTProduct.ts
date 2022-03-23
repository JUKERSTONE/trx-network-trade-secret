import {validate} from '@babel/types';
import React, {useEffect, useState, useContext} from 'react';
import {useT4AState} from '../..';
import {api, useAPI} from '../../api';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import {Platform} from 'react-native';

const {handleGetState} = useT4AState();

const keys = handleGetState({index: 'keys'});
const accessToken = keys.trx.accessToken;

export const useNFTProduct = ({navigation, route}: any) => {
  const {usePOST} = useAPI();
  const nftPayload = route.params;
  console.log(
    '🚀 ~ file: useNFTProduct.ts ~ line 11 ~ useNFTProduct ~ nftPayload',
    nftPayload,
  );
  const [value, setValue] = useState(0);
  const [loadingImage, setLoadingImage] = useState<any>(false);
  const [imageURL, setImageURL] = useState<any>();
  const [products, setProducts] = useState<any[]>([
    {
      type: 'media',
      price: 0,
      image: '',
      title: '',
    },
  ]);

  useEffect(() => {
    console.log(
      '🚀 ~ file: useNFeeTProduct.ts ~ line 19 ~ useNFTProduct ~ item',
      products,
    );
    handleValue();
  }, [products]);

  const handleValue = () => {
    const value = products.reduce(function (a, b) {
      return +a + +b['price'];
    }, 0);

    setValue(value);
  };

  const handleAddItem = () => {
    const item = {
      price: '',
      image: '',
      title: '',
    };
    setProducts([...products, item]);
  };

  const handleProduct = ({name, text, index}: any) => {
    const array = products;
    const oldItem = array[index];
    console.log(
      '🚀 ~ file: useNFTProduct.ts ~ line 45 ~ handleProduct ~ oldItem',
      oldItem,
    );

    switch (name) {
      case 'media':
        const mediaItem = {...oldItem, type: name};
        array.splice(index, 1, mediaItem);
        break;
      case 'tickets':
        const ticketsItem = {...oldItem, type: name};
        array.splice(index, 1, ticketsItem);
        break;
      case 'merchandise':
        const merchItem = {...oldItem, type: name};
        array.splice(index, 1, merchItem);
        break;
      default:
        const defaultItem = {...oldItem, [name]: text};
        array.splice(index, 1, defaultItem);
        break;
    }
    setProducts([...array]);
  };

  const handleRemoveProduct = ({index}: any) => {
    const newArr = products;
    newArr.splice(index, 1);

    setProducts([...newArr]);
  };

  const handleSubmitMerchandise = async () => {
    const payload = {
      ...nftPayload,
      trakPRODUCTS: products,
      trakIPO: value,
      trakVALUE: value,
      trakPRICE: value,
    };
    console.log(
      '🚀 ~ file: useNFTProduct.ts ~ line 85 ~ handleSubmitMerchandise ~ NFTPayload',
      payload,
    );

    const route = api.bernie({method: 'request_nft'});

    await usePOST({
      route,
      payload,
      token: accessToken,
    })
      .then(() => {
        alert('nft request sent to Bernie');
        navigation.navigate('TRX_DISTRIBUTION');
      })
      .catch((err: any) => {
        console.log(
          '🚀 ~ file: useNFTProduct.ts ~ line 118 ~ handleSubmitMerchandise ~ err',
          err,
        );
        alert('something went wrong');
      });
  };

  const handleUploadImage = ({index}: any) => {
    setLoadingImage(true);
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
    }).then(async image => {
      const imageUri = Platform.OS === 'ios' ? image.path : image.path;
      console.log(
        '🚀 ~ file: useRedeem.ts ~ line 127 ~ handleUploadImage ~ imageUri',
        imageUri,
      );

      if (imageUri == null) {
        return null;
      }

      // const uploadUri: any = imageUri;
      const uploadUri: any =
        Platform.OS === 'ios' ? imageUri.replace('file://', '') : imageUri;

      let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

      const extension = filename.split('.').pop();
      const name = filename.split('.').slice(0, -1).join('.');

      filename = name + Date.now() + '.' + extension;

      // setUploading(true);
      // setTransferred(0);

      const NFTFileName =
        nftPayload.artist + '_' + nftPayload.title + '_' + nftPayload.userID;
      console.log(
        '🚀 ~ file: useNFTProduct.ts ~ line 150 ~ handleUploadImage ~ NFTFileName',
        NFTFileName,
      );

      const upload: any = storage()
        .ref('nft/trx-00/' + NFTFileName + '/merchandise')
        .putFile(uploadUri, {contentType: 'image/jpeg'});

      upload.on(
        'state_changed',
        (snapshot: any) => {
          console.log(
            `${snapshot.bytesTransferred} transferred out of ${snapshot.totalBytes}`,
          );
          // setTransferred(
          //   Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          // );

          switch (snapshot.state) {
            case storage.TaskState.PAUSED:
              console.log('Upload Paused');
              break;
            case storage.TaskState.RUNNING:
              console.log('Upload Running');
              break;
            case storage.TaskState.SUCCESS:
              setLoadingImage(false);
              upload.snapshot.ref
                .getDownloadURL()
                .then((downloadURL: string) => {
                  console.log('File available at ', downloadURL);
                  // setImageURL(downloadURL);

                  //
                  const array = products;
                  const oldItem = array[index];
                  const defaultItem = {...oldItem, image: downloadURL};
                  array.splice(index, 1, defaultItem);
                  setProducts([...array]);
                  console.log(
                    '🚀 ~ file: useNFTProduct.ts ~ line 189 ~ .then ~ defaultItem',
                    defaultItem,
                  );
                });
              break;
            case storage.TaskState.ERROR:
              alert('ERROR : Try again');
          }
        },
        function (error: any) {
          // Handle unsuccessful uploads
          alert(error);
        },
      );
    });
  };

  return {
    handleAddItem,
    products,
    handleProduct,
    handleRemoveProduct,
    handleSubmitMerchandise,
    handleUploadImage,
    loadingImage,
  };
};
