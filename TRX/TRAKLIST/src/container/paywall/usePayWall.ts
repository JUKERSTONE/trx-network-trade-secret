import React, {useEffect, useState, useContext} from 'react';
import {useAuthentication} from '../../authentication';

export const usePayWall = () => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    setTimeout(() => {
      const data = [
        {title: 'free'},
        {title: 'basic'},
        {title: 'pro'},
        {title: 'musichead'},
      ];
      setData(data);
    }, 400);
  }, []);

  return {
    data,
  };
};
