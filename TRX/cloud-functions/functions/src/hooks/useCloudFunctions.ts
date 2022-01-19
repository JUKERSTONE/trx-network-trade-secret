import { getUser } from "./handlers";

export const useCloudFunctions = () => {
  const getUserFunction = getUser;
  return {
    getUserFunction,
  };
};
