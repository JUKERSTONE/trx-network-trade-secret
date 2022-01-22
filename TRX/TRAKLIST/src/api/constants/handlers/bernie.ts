export const handleBernieAPI = ({method, payload}: any) => {
  const base = 'https://europe-west1-bernie-trx.cloudfunctions.net/BERNIE';

  const subscription = payload?.subscription;
  const user_name = payload?.user_name;

  switch (method) {
    case 'raffle':
      return `${base}/trak/raffle/${subscription}/${user_name}`;
    case 'get_user_trak':
      return `${base}/user/${user_name}/trak`;
    case 'bank':
      return `${base}/trak`;
    default:
      alert('Invalid Method');
  }
};
