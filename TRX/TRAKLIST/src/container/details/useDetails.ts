import React, {useEffect, useState, useContext} from 'react';
import {useAuthentication} from '../../authentication';

export const useDetails = () => {
  const [details, setDetails] = useState<any>({
    trak_name: null,
    trak_symbol: null,
    phone_number: null,
    email_address: null,
    confirm_email_address: null,
    password: null,
  });
  const [hasRequiredDetails, setHasRequiredDetails] = useState<any>(false);

  useEffect(() => {
    console.log(details);

    const detailsArray = Object.keys(details);

    const hasRequiredDetails = !detailsArray.some(
      (key: string) => details[key] == null,
    );

    switch (hasRequiredDetails) {
      case true:
        setHasRequiredDetails(true);
        break;
      case false:
        setHasRequiredDetails(false);
        break;
    }
    // trak_name - min 5 characters, alphanumeric
    // trak_symbol - min 3 to 5 characters, alpha
  }, [details]);

  const handleDetailsChange = (text: any, type: string) => {
    switch (type) {
      case 'trak_name':
        setDetails({...details, trak_name: text});
        break;
      case 'trak_symbol':
        setDetails({...details, trak_symbol: text});
        break;
      case 'phone_number':
        setDetails({...details, phone_number: text});
        break;
      case 'email_address':
        setDetails({...details, email_address: text});
        break;
      case 'confirm_email_address':
        setDetails({...details, confirm_email_address: text});
        break;
      case 'password':
        setDetails({...details, password: text});
        break;
    }
  };

  return {
    handleDetailsChange,
    hasRequiredDetails,
  };
};
