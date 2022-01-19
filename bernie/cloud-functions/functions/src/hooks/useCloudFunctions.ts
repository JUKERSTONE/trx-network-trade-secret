import {
  setTRAK,
  appendTRAK,
  findTRAK,
  mineTRAK,
  searchTRAK,
  listenTRAK,
  watchCurrency,
  raffleTRAK,
  verifyDuplicate,
  getUserTRAK,
} from "./handlers";

export const useCloudFunctions = () => {
  const setTRAKFunction = setTRAK;
  const appendTRAKFunction = appendTRAK;
  const mineTRAKFunction = mineTRAK;
  const findTRAKFunction = findTRAK;
  const watchCurrencyFunction = watchCurrency;
  const listenTRAKFunction = listenTRAK;
  const listenJUKEFunction = listenTRAK;
  const listenPATRONFunction = listenTRAK;
  const searchTRAKFunction = searchTRAK;
  const raffleFreeFunction = raffleTRAK;
  const verifyDuplicateFunction = verifyDuplicate;
  const getUserTRAKFunction = getUserTRAK;

  return {
    setTRAKFunction,
    appendTRAKFunction,
    findTRAKFunction,
    mineTRAKFunction,
    searchTRAKFunction,
    watchCurrencyFunction,
    listenTRAKFunction,
    listenPATRONFunction,
    listenJUKEFunction,
    raffleFreeFunction,
    verifyDuplicateFunction,
    getUserTRAKFunction,
  };
};
