import {useFirebase} from '../../firebase';

export const handleChats = async () => {
  const {handleRetrieveChats1} = useFirebase();

  handleRetrieveChats1();
};
