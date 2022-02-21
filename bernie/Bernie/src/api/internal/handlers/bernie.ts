import {APIKeys} from '../../';

export const bernie = ({method}: any) => {
  const base = 'https://europe-west1-bernie-trx.cloudfunctions.net/BERNIE';

  switch (method) {
    case 'set_trak':
      return `${base}/trak`;
    case 'duplicate_trak':
      return `${base}/trak/verify/duplicate`;
    case 'nft_requests':
      return `${base}/nft/requests`;
    case 'set_nft':
      return `${base}/nft`;
  }
};
