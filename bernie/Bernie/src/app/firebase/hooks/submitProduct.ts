import firestore from '@react-native-firebase/firestore';

export const handleSubmitProduct = async (product: any) => {
  return await firestore().collection('shop').add(product);
};
