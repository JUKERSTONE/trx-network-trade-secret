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
  getNFTRequests,
  getNFTRequest,
  appendHasNFTToTRAK,
  setNFT,
  purchaseNFT,
  getUserNFT,
  getNFT,
  getUserWallet,
  getArtistPortfolio,
  appendNFTMerchandise,
  getNFTMerchandise,
  test,
  setTLTTrending,
  getTLTTrending,
  setTLTNews,
  getTLTNews,
  //
  setTRX_00Trak,
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
  const getNFTRequestsFunction = getNFTRequests;
  const getNFTRequestFunction = getNFTRequest;
  const scriptHasNFTFunction = appendHasNFTToTRAK;
  const setNFTFunction = setNFT;
  const purchaseNFTFunction = purchaseNFT;
  const getUserNFTFunction = getUserNFT;
  const getNFTFunction = getNFT;
  const getUserWalletFunction = getUserWallet;
  const getArtistPortfolioFunction = getArtistPortfolio;
  const appendNFTMerchandiseFunction = appendNFTMerchandise;
  const getNFTMerchandiseFunction = getNFTMerchandise;
  const check = test;
  const setTLTTrendingFunction = setTLTTrending;
  const getTLTTrendingFunction = getTLTTrending;
  const setTLTNewsFunction = setTLTNews;
  const getTLTNewsFunction = getTLTNews;
  //
  const setTRX_00TrakFunction = setTRX_00Trak;

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
    getNFTRequestsFunction,
    getNFTRequestFunction,
    scriptHasNFTFunction,
    setNFTFunction,
    purchaseNFTFunction,
    getUserNFTFunction,
    getNFTFunction,
    getUserWalletFunction,
    getArtistPortfolioFunction,
    appendNFTMerchandiseFunction,
    getNFTMerchandiseFunction,
    check,
    setTLTTrendingFunction,
    getTLTTrendingFunction,
    setTLTNewsFunction,
    getTLTNewsFunction,
    //
    setTRX_00TrakFunction,
  };
};
