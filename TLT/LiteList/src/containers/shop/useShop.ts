import {useEffect, useState} from 'react';
import {handleGetShop} from '../../app';

export const useShop = ({navigation, route}: any) => {
  const [collections, setCollections] = useState();

  useEffect(() => {
    handleItems();
  }, []);

  const handleItems = async () => {
    const collections = await handleGetShop();
    setCollections(collections);
  };

  const handleProduct = ({item}: any) => {
    navigation.navigate('Product', {
      item,
    });
  };

  return {
    collections,
    handleProduct,
  };
};
