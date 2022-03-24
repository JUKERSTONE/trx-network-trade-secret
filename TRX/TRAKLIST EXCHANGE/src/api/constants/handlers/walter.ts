export const handleWalterAPI = ({method, payload}: any) => {
  const base = 'https://europe-west1-forchain-1cdb0.cloudfunctions.net/WALTER';

  switch (method) {
    case 'connect_forchain':
      return `${base}/forchain/connect`;
    default:
      alert('Invalid Method');
  }
};
