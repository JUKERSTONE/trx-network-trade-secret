import { setTRAK, appendTRAK } from "./handlers";

export const useCloudFunctions = () => {
  const setTRAKFunction = ({ ...props }) => setTRAK(props);
  const appendTRAKFunction = ({ ...props }) => appendTRAK(props);
  return {
    setTRAKFunction,
    appendTRAKFunction,
  };
};
