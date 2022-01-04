import { v4 as uuidv4 } from "uuid";

export const generateTRAKID = () => {
  const trakID = uuidv4();

  return trakID;
};
