import {APIKeys} from '../../';

export const bernie = ({method}: any) => {
  const base = 'https://europe-west1-bernie-trx.cloudfunctions.net/BERNIE';

  switch (method) {
    case 'set_trak':
      return `${base}/trx_00/trak`;
    case 'duplicate_trak':
      return `${base}/trx_00/trak/verify/duplicate`;
    case 'nft_requests':
      return `${base}/trx_00/nft/requests`;
    case 'set_nft':
      return `${base}/trx_00/nft`;
    case 'trending':
      return `${base}/TLT/trending`;
    case 'news':
      return `${base}/TLT/news`;
    default:
      alert('Invalid Route');
  }
};
