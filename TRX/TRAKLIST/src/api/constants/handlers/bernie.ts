export const handleBernieAPI = ({method, payload}: any) => {
  const base = 'https://europe-west1-bernie-trx.cloudfunctions.net/BERNIE';

  const {subscription} = payload;

  switch (method) {
    case 'raffle':
      return `${base}/trak/raffle/${subscription}`;
  }
};
