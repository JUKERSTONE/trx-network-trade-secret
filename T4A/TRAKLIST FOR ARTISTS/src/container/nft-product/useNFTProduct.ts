import {validate} from '@babel/types';
import React, {useEffect, useState, useContext} from 'react';
import {useT4AState} from '../..';
import {api, useAPI} from '../../api';

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

    const response: any = await usePOST({
      route,
      payload,
      token: accessToken,
    });
    console.log(
      '🚀 ~ file: useNFTProduct.ts ~ line 103 ~ handleSubmitMerchandise ~ response',
      response,
    );
  };

  return {
    handleAddItem,
    products,
    handleProduct,
    handleRemoveProduct,
    handleSubmitMerchandise,
  };
};
