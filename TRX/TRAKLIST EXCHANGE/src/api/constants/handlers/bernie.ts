export const handleBernieAPI = ({method, payload}: any) => {
  const base = 'https://europe-west1-bernie-trx.cloudfunctions.net/BERNIE';

  const subscription = payload?.subscription;
  const user_name = payload?.user_name;
  const nftID = payload?.nftID;
  const boughtID = payload?.boughtID;
  const soldID = payload?.soldID;
  const trakID = payload?.trakID;

  switch (method) {
    case 'raffle':
      return `${base}/trak/raffle/${subscription}/${user_name}`;
    case 'get_user_trak':
      return `${base}/user/${user_name}/trak`;
    case 'bank':
      return `${base}/trak`;
    case 'purchase_nft':
      return `${base}/nft/purchase/${nftID}/${user_name}`;
    case 'get_user_wallet':
      return `${base}/user/${user_name}/wallet`;
    case 'exchange_trak':
      return `${base}/trak/exchange/${boughtID}/${soldID}/${user_name}`;
    case 'get_trak':
      return `${base}/trak/${trakID}`;
    case 'get_nft_merchandise':
      return `${base}/nft/merchandise/${nftID}`;
    default:
      alert('Invalid Method');
  }
};
