import {useState} from 'react';

export const useRegister = () => {
  const [routes] = useState([
    {key: 'first', title: `Connect`},
    {key: 'second', title: 'Details'},
    {key: 'third', title: 'Profile'},
  ]);

  return {
    routes,
  };
};
