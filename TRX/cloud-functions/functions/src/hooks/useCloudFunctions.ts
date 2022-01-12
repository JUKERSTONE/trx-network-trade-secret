import { registerUser } from "./handlers";

export const useCloudFunctions = () => {
  const registerUserFunction = registerUser;
  return {
    registerUserFunction,
  };
};
