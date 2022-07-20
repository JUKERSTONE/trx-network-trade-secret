import {APIKeys} from '../..';

export const traklist = ({method}: any) => {
  const base = 'https://europe-west1-trx-traklist.cloudfunctions.net/TRAKLIST';

  switch (method) {
    case 'news':
      return `${base}/traklite/admin/news`;
    case 'trending':
      return `${base}/traklite/admin/trending`;
    default:
      alert('Invalid Route');
  }
};
