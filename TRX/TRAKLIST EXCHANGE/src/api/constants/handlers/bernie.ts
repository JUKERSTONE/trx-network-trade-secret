export const handleBernieAPI = ({method, payload}: any) => {
  const base = 'https://europe-west1-bernie-trx.cloudfunctions.net/BERNIE';

  const subscription = payload?.subscription;
  const nftID = payload?.nftID;
  const boughtID = payload?.boughtID;
  const soldID = payload?.soldID;
  const trakID = payload?.trakID;

  switch (method) {
    case 'raffle':
      return `${base}/trak/raffle/${subscription}`;
    case 'bank':
      return `${base}/trak`;
    case 'purchase_nft':
      return `${base}/nft/${nftID}/purchase`;
    case 'get_user_wallet':
      return `${base}/user/wallet`;
    case 'exchange_trak':
      return `${base}/trak/exchange`;
    case 'get_trak':
      return `${base}/trak/${trakID}`;
    case 'get_nft_merchandise':
      return `${base}/nft/${nftID}/merchandise`;
    default:
      alert('Invalid Method');
  }
};
