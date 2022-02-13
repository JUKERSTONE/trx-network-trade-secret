export const handleBernieAPI = ({method, payload}: any) => {
  const base = 'https://europe-west1-bernie-trx.cloudfunctions.net/BERNIE';

  const subscription = payload?.subscription;
  const user_name = payload?.user_name;
  const userID = payload?.userID;

  switch (method) {
    case 'raffle':
      return `${base}/trak/raffle/${subscription}/${user_name}`;
    case 'get_user_trak':
      return `${base}/user/${user_name}/trak`;
    case 'bank':
      return `${base}/trak`;
    case 'request_nft':
      return `${base}/trak/nft/request`;
    case 'get_artist_portfolio':
      return `${base}/artist/${userID}/portfolio`;
    case 'add_merchandise':
      return `${base}/nft/merchandise/add`;
    default:
      alert('Invalid Method');
  }
};
