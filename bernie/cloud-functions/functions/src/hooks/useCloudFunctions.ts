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
  getTRAK,
  getTRAKBank,
  exchangeTRAK,
  requestNFT,
  verifyNFT,
  getNFTRequests,
  getNFTRequest,
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
  const getTRAKFunction = getTRAK;
  const getTRAKBankFunction = getTRAKBank;
  const exchangeTRAKFunction = exchangeTRAK;
  const requestNFTFunction = requestNFT;
  const verifyNFTFunction = verifyNFT;
  const getNFTRequestsFunction = getNFTRequests;
  const getNFTRequestFunction = getNFTRequest;

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
    getTRAKFunction,
    getTRAKBankFunction,
    exchangeTRAKFunction,
    requestNFTFunction,
    verifyNFTFunction,
    getNFTRequestsFunction,
    getNFTRequestFunction,
  };
};
