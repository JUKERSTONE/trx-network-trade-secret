import React, {useEffect, useState, useContext} from 'react';
import {useAuthentication} from '../../authentication';

export const useProfileEdit = () => {
  const [details, setDetails] = useState<any>({
    user_name: null,
    bio: null,
    quotable: null,
    location: null,
  });
  const [hasRequiredDetails, setHasRequiredDetails] = useState<any>(false);

  useEffect(() => {
    const detailsArray = Object.keys(details);

    const hasRequiredDetails = !detailsArray.some(
      (key: string) => details[key] == (null || ''),
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

  const handleProfileEditChange = (text: any, type: string) => {
    switch (type) {
      case 'user_name':
        setDetails({...details, user_name: text});
        break;
      case 'bio':
        setDetails({...details, bio: text});
        break;
      case 'quotable':
        setDetails({...details, quotable: text});
        break;
      case 'location':
        setDetails({...details, location: text});
        break;
    }
  };

  return {
    handleProfileEditChange,
    hasRequiredDetails,
  };
};
