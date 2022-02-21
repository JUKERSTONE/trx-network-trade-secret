export const handleBernieAPI = ({method, payload}: any) => {
  const base = 'https://europe-west1-bernie-trx.cloudfunctions.net/BERNIE';

  switch (method) {
    case 'bank':
      return `${base}/trak`;
    case 'request_nft':
      return `${base}/nft/request`;
    case 'get_artist_portfolio':
      return `${base}/artist/portfolio`;
    case 'add_merchandise':
      return `${base}/nft/merchandise`;
    default:
      alert('Invalid Method');
  }
};
