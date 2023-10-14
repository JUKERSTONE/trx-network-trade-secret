import {APIKeys} from '../..';

export const traklist = ({method}: any) => {
  const base =
    'https://europe-west1-trx-traklist.cloudfunctions.net/TRAKLIST_API';

  switch (method) {
    case 'news':
      return `${base}/traklite/admin/news`;
    case 'trending':
      return `${base}/traklite/admin/trending`;
    case 'duplicate_trak':
      return `${base}/trx_00/trak/verify/duplicate`;
    case 'set_trak':
      return `${base}/trx_00/trak`;
    default:
      alert('Invalid Route');
  }
};
