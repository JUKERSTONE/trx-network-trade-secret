import { setTRAK } from "./handlers";

export const useCloudFunctions = () => {
  const setTRAKFunction = ({ ...props }) => setTRAK(props);

  return {
    setTRAKFunction,
  };
};
