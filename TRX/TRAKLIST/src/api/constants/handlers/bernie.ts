export const handleBernieAPI = ({method, payload}: any) => {
  const base = 'https://europe-west1-bernie-trx.cloudfunctions.net/BERNIE';

  const {subscription, user_name} = payload;

  switch (method) {
    case 'raffle':
      return `${base}/trak/raffle/${subscription}/${user_name}`;
    case 'get_user_trak':
      return `${base}/user/${user_name}/trak`;
  }
};
